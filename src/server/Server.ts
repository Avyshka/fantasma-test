import {GlobalEventProvider} from "../app/events/GlobalEventProvider";
import {IRequest} from "./interfaces/IRequest";
import {ServerEvents} from "./events/ServerEvents";
import {IServerResponse} from "./interfaces/ResponseInterfaces";
import {IInitResult, ISpinResult} from "./interfaces/ResultInterfaces";
import {ServerModel} from "./models/ServerModel";
import {ServerRequests} from "./enums/ServerRequests";

export class Server extends GlobalEventProvider {

    private serverModel: ServerModel = new ServerModel();

    public playRequest(data: IRequest): void {
        if (data.message === ServerRequests.SPIN) {
            this.serverModel.bet = data.payload.bet;
            this.serverModel.balance -= this.serverModel.bet;
            this.serverModel.doSpin();
        } else {
            this.serverModel.doInit();
        }

        // imitate delay from real server
        setTimeout(
            () => this.dispatch(ServerEvents.SEND_RESPONSE_TO_SERVER_CONNECTOR, this.getResponse(data.message)),
            150 * Math.random() + 50
        );
    }

    private getResponse(message: ServerRequests): IServerResponse {
        return {
            balance: {
                amount: this.serverModel.balance,
                currency: this.serverModel.currency
            },
            bet: this.serverModel.bet,
            result: message === ServerRequests.SPIN
                ? this.getSpinResult()
                : this.getInitResult()
        };
    }

    private getInitResult(): IInitResult {
        return {
            action: ServerRequests.INIT,
            set: this.serverModel.set,
            view: this.serverModel.view
        };
    }

    private getSpinResult(): ISpinResult {
        return {
            action: ServerRequests.SPIN,
            view: this.serverModel.view,
            totalWin: this.serverModel.totalWin,
            winSymbolPositions: this.serverModel.winSymbolPositions
        };
    }
}
