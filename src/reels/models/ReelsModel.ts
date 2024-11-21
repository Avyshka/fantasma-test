import {BaseServerModel} from "../../app/models/BaseServerModel";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";
import {ServerRequests} from "../../server/enums/ServerRequests";
import {IInitResult, IReelView} from "../../server/interfaces/ResultInterfaces";
import {ReelsConstants} from "../ReelsConstants";

export class ReelsModel extends BaseServerModel {

    private static instance: ReelsModel;

    private set: number[][];
    private reelsViewWithExtraSymbols: number[][];

    public reelSetPosition: number[];
    public stopPositions: number[];

    private constructor() {
        super();
    }

    public static getInstance(): ReelsModel {
        if (!ReelsModel.instance) {
            ReelsModel.instance = new ReelsModel();
        }
        return ReelsModel.instance;
    }

    protected parseResponse(data: IServerResponse): void {
        if (data.result.action === ServerRequests.INIT) {
            const result: IInitResult = data.result as IInitResult;
            this.set = result.set;
            this.reelSetPosition = Array(this.set.length).fill(ReelsConstants.EXTRA_LINES);
        }
        this.setReelsViewData(data.result.view);
    }

    private setReelsViewData(view: IReelView): void {
        this.reelsViewWithExtraSymbols = this.getReels(view);
        this.stopPositions = view.stop;
    }

    private getReels(view: IReelView): number[][] {
        const viewWithExtraSymbols: number[][] = [];
        for (let i: number = 0; i < view.screen.length; i++) {
            viewWithExtraSymbols.push([
                view.above[i],
                ...view.screen[i],
                view.below[i]
            ]);
        }
        return viewWithExtraSymbols;
    }

    public getReelStopSymbols(reelIndex: number): number[] {
        return this.reelsViewWithExtraSymbols[reelIndex].slice();
    }

    public getNextSymbolOnReel(reelIndex: number, step: number): number {
        this.reelSetPosition[reelIndex] += step;

        if (this.reelSetPosition[reelIndex] < 0) {
            this.reelSetPosition[reelIndex] += this.set[reelIndex].length;
        } else if (this.reelSetPosition[reelIndex] >= this.set[reelIndex].length) {
            this.reelSetPosition[reelIndex] %= this.set[reelIndex].length;
        }
        return this.set[reelIndex][this.reelSetPosition[reelIndex]];
    }
}