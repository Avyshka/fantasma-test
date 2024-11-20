import {BaseServerModel} from "../../app/models/BaseServerModel";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";
import {ISpinResult} from "../../server/interfaces/ResultInterfaces";

export class WinModel extends BaseServerModel {

    private _totalWin: number;
    private _winSymbolPositions: number[][];

    private static instance: WinModel;

    private constructor() {
        super();
    }

    public static getInstance(): WinModel {
        if (!WinModel.instance) {
            WinModel.instance = new WinModel();
        }
        return WinModel.instance;
    }

    protected parseResponse(data: IServerResponse): void {
        const result: ISpinResult = data.result as ISpinResult;
        this._totalWin = result.totalWin || 0;
        this._winSymbolPositions = result.winSymbolPositions || [];
    }

    public get totalWin(): number {
        return this._totalWin;
    }

    public get winSymbolPositions(): number[][] {
        return this._winSymbolPositions;
    }
}