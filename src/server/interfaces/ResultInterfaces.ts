import {ServerRequestType} from "../types/ServerRequestType";

export interface IBaseResult {
    action: ServerRequestType;
    view: IReelView;
}

export interface IInitResult extends IBaseResult {
    set: number[][];
}

export interface ISpinResult extends IBaseResult {
    totalWin: number;
    winSymbolPositions: number[][];
}

export class IReelView {
    stop: number[];
    above: number[];
    screen: number[][];
    below: number[];
}