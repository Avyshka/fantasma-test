import {GlobalEventProvider} from "../app/events/GlobalEventProvider";
import {IRequest} from "../gameFlow/interfaces/IRequest";
import {ServerEvents} from "./events/ServerEvents";
import {IServerResponse} from "../gameFlow/interfaces/ResponseInterfaces";
import {IInitResult, ISpinResult} from "../gameFlow/interfaces/ResultInterfaces";
import {ServerModel} from "./models/ServerModel";
import {ServerConstants} from "./ServerConstants";

export class Server extends GlobalEventProvider {

    private serverModel: ServerModel = new ServerModel();

    public playRequest(data: IRequest): void {
        if (data.message === "spin") {
            this.serverModel.doSpin();
            this.serverModel.balance -= data.payload?.bet || 0;
        } else {
            this.serverModel.doSpin(1);
        }

        // imitate delay from real server
        setTimeout(
            () => this.dispatch(ServerEvents.SEND_RESPONSE_TO_SERVER_CONNECTOR, this.getResponse(data.message)),
            150 * Math.random() + 50
        );
    }

    private getResponse(message: "init" | "spin"): IServerResponse {
        return {
            balance: {
                amount: this.serverModel.balance,
                currency: ServerConstants.currency
            },
            result: message === "spin" ? this.getSpinResult() : this.getInitResult()
        };
    }

    private getInitResult(): IInitResult {
        return {
            set: this.serverModel.set,
            view: this.serverModel.view
        };
    }

    private getSpinResult(): ISpinResult {
        return {
            view: this.serverModel.view,
            totalWin: this.serverModel.totalWin,
            winSymbolPositions: this.serverModel.winSymbolPositions
        };
    }
}