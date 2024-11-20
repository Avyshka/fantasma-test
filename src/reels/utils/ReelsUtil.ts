import {ReelsModel} from "../models/ReelsModel";
import {ReelsConstants} from "../ReelsConstants";

export class ReelsUtil {

    private reelsModel: ReelsModel = ReelsModel.getInstance();

    private static instance: ReelsUtil;

    private constructor() {
    }

    public static getInstance(): ReelsUtil {
        if (!ReelsUtil.instance) {
            ReelsUtil.instance = new ReelsUtil();
        }
        return ReelsUtil.instance;
    }

    public getReelStopSymbols(reelIndex: number): number[] {
        return this.reelsModel.getReelStopSymbols(reelIndex);
    }

    public updateReelSetPosition(reelId: number, step: number): void {
        this.reelsModel.reelSetPosition[reelId] =
            this.reelsModel.stopPositions[reelId] +
            ReelsConstants.EXTRA_LINES *
            step;
    }

    public getNextTile(reelId: number, step: number): number {
        return this.reelsModel.getNextSymbolOnReel(reelId, step);
    }
}