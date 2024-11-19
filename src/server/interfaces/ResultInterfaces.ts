import {ServerRequestType} from "../types/ServerRequestType";

export interface IBaseResult {
    action: ServerRequestType;
}

export interface IInitResult extends IBaseResult {
    set: number[];
    view: IReelView;
}

export interface ISpinResult extends IBaseResult {
    view: IReelView;
    totalWin: number;
    winSymbolPositions: number[];
}

export class IReelView {
    stop: number;
    above: number;
    screen: number[];
    below: number;
}