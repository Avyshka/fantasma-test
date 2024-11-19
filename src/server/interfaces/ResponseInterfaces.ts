import {IInitResult, ISpinResult} from "./ResultInterfaces";

export interface IServerResponse {
    balance: {
        amount: number;
        currency: string;
    };
    bet: number;
    result: IInitResult | ISpinResult;
}
