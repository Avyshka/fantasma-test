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

    public startSpinning(): void {
        this.reelsStatesModel.canStopEnabled = true;
        this.reelsStatesModel.forceStopActive = false;
        this.reelsStatesModel.reelStartingPromises = [];
        this.reelsStatesModel.reelStoppingPromises = [];
        this.reelsStatesModel.reelStoppingResolves = [];
        this.fillReelStartingPromises();
    }

    private fillReelStartingPromises(): void {
        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            this.reelsStatesModel.reelStartingPromises.push(this.reels[i].doSpin());
        }
    }

    public stop(): void {
        if (this.reelsStatesModel.forceStopActive || !this.reelsStatesModel.canStopEnabled) {
            return;
        }
        this.reelsStatesModel.canStopEnabled = false;

        this.doStoppingReels();
        this.waitStopping();
    }

    public forceStop(): void {
        if (this.reelsStatesModel.forceStopActive) {
            return;
        }
        this.reelsStatesModel.forceStopActive = true;

        this.doStoppingReels();
        this.waitStopping();
    }

    private doStoppingReels(): void {
        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            this.reelsStatesModel.reelStoppingPromises.push(this.getReelStopPromise(this.reels[i], i));
        }
    }

    private waitStopping(): void {
        Promise.all(this.reelsStatesModel.reelStoppingPromises)
            .then(() => {
                this.perReelStoppingTimeout.forEach((timeout) => clearTimeout(timeout));
                this.perReelStoppingTimeout = [];

                this.reelsStatesModel.reelStartingPromises = [];
                this.reelsStatesModel.reelStoppingPromises = [];

                this.reelsStatesModel.forceStopActive = false;

                this.emit(ReelsViewEvents.ALL_REELS_STOPPED);
            });
    }

    private getReelStopPromise(reel: ReelView, reelIndex: number): Promise<void> {
        return new Promise(resolve => {
            this.reelsStatesModel.reelStoppingResolves[reel.reelId] = resolve;
            this.perReelStoppingTimeout.push(
                setTimeout(() => reel.readyStop().then(resolve), this.getPerReelStoppingDelay(reelIndex))
            );
        });
    }

    private getPerReelStoppingDelay(reelIndex: number): number {
        const delay: number = this.reelsStatesModel.forceStopActive
            ? ReelsConstants.FORCE_PER_REEL_STOPPING_DELAY
            : ReelsConstants.PER_REEL_STOPPING_DELAY;
        return reelIndex * delay;
    }
}