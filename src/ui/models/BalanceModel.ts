import {BaseServerModel} from "../../app/models/BaseServerModel";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";
import {ServerRequests} from "../../server/enums/ServerRequests";
import {ServerRequestType} from "../../server/types/ServerRequestType";
import {BalanceBarIntents} from "../events/BalanceBarIntents";
import {SpinButtonIntents} from "../events/SpinButtonIntents";

export class BalanceModel extends BaseServerModel {

    private _balance: number;

    private static instance: BalanceModel;

    private constructor() {
        super();
    }

    public static getInstance(): BalanceModel {
        if (!BalanceModel.instance) {
            BalanceModel.instance = new BalanceModel();
        }
        return BalanceModel.instance;
    }

    protected parseResponse(data: IServerResponse): void {
        this._balance = data.balance.amount;

        if (__DEV__ && data.result.action === ServerRequests.UPDATE) {
            this.dispatch(BalanceBarIntents.UPDATE_VIEW_BALANCE);
            // if the spin button is disabled we have to enable it
            this.dispatch(SpinButtonIntents.CHANGE_STATE, true);
        }
    }

    protected getSupportedRequestTypes(): ServerRequestType[] {
        return [...super.getSupportedRequestTypes(), ServerRequests.UPDATE];
    }

    public get balance(): number {
        return this._balance;
    }

    public set balance(value: number) {
        this._balance = value;
    }
}