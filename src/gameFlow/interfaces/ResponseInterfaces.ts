import {ISpinResult, IInitResult} from "./ResultInterfaces";

export interface IServerResponse {
    balance: {
        amount: number;
        currency: string;
    }
    result: IInitResult | ISpinResult;
}
