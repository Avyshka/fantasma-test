import {ReelView} from "./ReelView";
import {ReelsConstants} from "../ReelsConstants";
import {ReelsStatesModel} from "../models/ReelsStatesModel";
import {ReelsViewEvents} from "../events/ReelsViewEvents";
import {ReelsUtil} from "../utils/ReelsUtil";
import {BaseView} from "../../app/views/BaseView";

export class MachineView extends BaseView {

    private reelsStatesModel: ReelsStatesModel = ReelsStatesModel.getInstance();
    private reelsUtil: ReelsUtil = ReelsUtil.getInstance();

    private reels: ReelView[];
    private perReelStoppingTimeout: any[];

    constructor() {
        super();

        this.reels = [];
        this.perReelStoppingTimeout = [];
        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            const reel: ReelView = new ReelView();
            reel.x = (ReelsConstants.TILE_WIDTH + ReelsConstants.REEL_GAP) * i;
            this.addChild(reel);
            this.reels[i] = reel;
            reel.reelId = i;
            reel.buildReel();
            reel.initReel(this.reelsUtil.getReelStopSymbols(i));
        }
        this.pivot.x = this.width * 0.5;
    }

    public async startSpinning(): Promise<void> {
        this.reelsStatesModel.canStopEnabled = true;
        this.reelsStatesModel.forceStopActive = false;
        this.reelsStatesModel.reelStartingPromises = [];
        this.reelsStatesModel.reelStoppingPromises = [];
        this.reelsStatesModel.reelForceStoppingPromises = [];
        this.reelsStatesModel.reelStoppingResolves = [];
        this.fillReelStartingPromises();
        await Promise.all(this.reelsStatesModel.reelStartingPromises);
    }

    private fillReelStartingPromises(): void {
        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            this.reelsStatesModel.reelStartingPromises.push(this.reels[i].doSpin());
        }
    }

    public async stop(): Promise<void> {
        if (this.reelsStatesModel.forceStopActive || !this.reelsStatesModel.canStopEnabled) {
            return;
        }
        this.reelsStatesModel.canStopEnabled = true;

        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            this.reelsStatesModel.reelStoppingPromises.push(this.getReelStopPromise(this.reels[i], i));
        }
        this.waitStopping();
    }

    public forceStop(): void {
        if (this.reelsStatesModel.forceStopActive) {
            return;
        }
        this.reelsStatesModel.forceStopActive = true;

        this.perReelStoppingTimeout.forEach((timeout) => clearTimeout(timeout));
        this.perReelStoppingTimeout = [];

        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            const reel: ReelView = this.reels[i];
            if (this.isReelForceStopAllowed(reel)) {
                this.reelsStatesModel.reelForceStoppingPromises.push(this.getReelForceStopPromise(reel));
                if (this.reelsStatesModel.reelStoppingResolves[i]) {
                    this.reelsStatesModel.reelStoppingResolves[i]();
                }
            }
        }
        this.waitStopping();
    }

    private isReelForceStopAllowed(reel: ReelView): boolean {
        return !this.reelsStatesModel.isSingleReelStopped(reel.reelId) && !reel.finalStoppingTweenActive;
    }

    private async waitStopping(): Promise<void> {
        await Promise.all(this.reelsStatesModel.reelStoppingPromises);
        await Promise.all(this.reelsStatesModel.reelForceStoppingPromises);

        this.perReelStoppingTimeout.forEach((timeout) => clearTimeout(timeout));
        this.perReelStoppingTimeout = [];

        this.reelsStatesModel.reelStartingPromises = [];
        this.reelsStatesModel.reelStoppingPromises = [];
        this.reelsStatesModel.reelForceStoppingPromises = [];

        this.reelsStatesModel.forceStopActive = false;

        this.emit(ReelsViewEvents.ALL_REELS_STOPPED);
    }

    private getReelStopPromise(reel: ReelView, reelIndex: number): Promise<void> {
        return new Promise(resolve => {
            this.reelsStatesModel.reelStoppingResolves[reel.reelId] = resolve;
            this.perReelStoppingTimeout.push(
                setTimeout(() => reel.readyStop().then(resolve), this.getPerReelStoppingDelay(reelIndex))
            );
        });
    }

    private getReelForceStopPromise(reel: ReelView): Promise<void> {
        return reel.readyForceStop();
    }

    private getPerReelStoppingDelay(reelIndex: number): number {
        if (this.reelsStatesModel.forceStopActive) {
            return 0;
        }
        return reelIndex * ReelsConstants.PER_REEL_STOPPING_DELAY;
    }
}