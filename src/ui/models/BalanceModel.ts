import {BaseServerModel} from "../../app/models/BaseServerModel";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";
import {ServerRequests} from "../../server/enums/ServerRequests";

export class BalanceModel extends BaseServerModel {

    private _balance: number;
    private _currency: string;

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
        if (data.result.action === ServerRequests.INIT) {
            this._currency = data.balance.currency;
        }
        this._balance = data.balance.amount;
    }

    public get balance(): number {
        return this._balance;
    }

    public set balance(value: number) {
        this._balance = value;
    }

    public get currency(): string {
        return this._currency;
    }
}