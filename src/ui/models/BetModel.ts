import {BaseServerModel} from "../../app/models/BaseServerModel";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";
import {ServerRequests} from "../../server/enums/ServerRequests";
import {ServerRequestType} from "../../server/types/ServerRequestType";

export class BetModel extends BaseServerModel {

    private _bet: number;

    private static instance: BetModel;

    private constructor() {
        super();
    }

    public static getInstance(): BetModel {
        if (!BetModel.instance) {
            BetModel.instance = new BetModel();
        }
        return BetModel.instance;
    }

    protected parseResponse(data: IServerResponse): void {
        this._bet = data.bet;
    }

    protected getSupportedRequestTypes(): ServerRequestType[] {
        return [ServerRequests.INIT];
    }

    public get bet(): number {
        return this._bet;
    }
}