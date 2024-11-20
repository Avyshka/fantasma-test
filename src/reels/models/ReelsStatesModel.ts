import {ReelStateType} from "../types/ReelStateType";
import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {ReelsStatesEnum} from "../enums/ReelsStatesEnum";

export class ReelsStatesModel extends GlobalEventProvider {

    private static instance: ReelsStatesModel;

    private states: ReelStateType[] = [];

    public canStopEnabled: boolean;
    public forceStopActive: boolean;

    public reelStartingPromises: Promise<void>[];
    public reelStoppingPromises: Promise<void>[];
    public reelForceStoppingPromises: Promise<void>[];
    public reelStoppingResolves: Function[];

    private constructor() {
        super();
    }

    public static getInstance(): ReelsStatesModel {
        if (!ReelsStatesModel.instance) {
            ReelsStatesModel.instance = new ReelsStatesModel();
        }
        return ReelsStatesModel.instance;
    }

    public setSingleReelState(state: ReelStateType, reelId: number): void {
        this.states[reelId] = state;
    }

    public getSingleReelState(reelId: number): ReelStateType {
        return this.states[reelId];
    }

    public isSingleReelStopped(reelId: number): boolean {
        return this.states[reelId] === ReelsStatesEnum.STOPPED;
    }

    public isAllReelsStopped(): boolean {
        return this.states.every((state: ReelStateType) => state === ReelsStatesEnum.STOPPED);
    }
}