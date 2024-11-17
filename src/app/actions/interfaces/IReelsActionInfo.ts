import {IActionInfo} from "./IActionInfo";

export interface IReelsActionInfo extends IActionInfo {
    spinStartTime?: number;
    spinResponsePromise?: Promise<any>;
}