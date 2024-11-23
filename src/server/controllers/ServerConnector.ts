import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {ServerEvents} from "../events/ServerEvents";
import {Server} from "../Server";
import {BetModel} from "../../ui/models/BetModel";
import {ServerRequests} from "../enums/ServerRequests";

export class ServerConnector extends GlobalEventProvider {

    private server: Server = new Server();
    private betModel: BetModel = BetModel.getInstance();

    constructor() {
        super();
        this.addListener(ServerEvents.SEND_RESPONSE_TO_SERVER_CONNECTOR, this.onResponse); // from server
        this.addListener(ServerEvents.SEND_INIT_REQUEST_TO_SERVER_CONNECTOR, this.onInitRequest); // to server
        this.addListener(ServerEvents.SEND_PLAY_REQUEST_TO_SERVER_CONNECTOR, this.onPlayRequest); // to server
        if (__DEV__) {
            this.addListener(ServerEvents.SEND_CHANGING_BALANCE_TO_SERVER_CONNECTOR, this.onChangeBalanceRequest); // to server
        }
    }

    private onResponse(data: any): void {
        this.log("ServerEvent.RESPONSE");
        console.log(data);
        this.dispatch(ServerEvents.RESPONSE, data);
    }

    private onChangeBalanceRequest(balance: number): void {
        this.log("ServerEvent.SEND_CHANGING_BALANCE_TO_SERVER_CONNECTOR");
        this.server.playRequest({
            message: ServerRequests.UPDATE,
            payload: {
                balance: balance
            }
        });
    }

    private onInitRequest(): void {
        this.log("ServerEvent.SEND_INIT_REQUEST_TO_SERVER_CONNECTOR");
        this.server.playRequest({
            message: ServerRequests.INIT,
            payload: null
        });
    }

    private onPlayRequest(): void {
        this.log("ServerEvent.SEND_PLAY_REQUEST_TO_SERVER_CONNECTOR");
        this.server.playRequest({
            message: ServerRequests.SPIN,
            payload: {
                bet: this.betModel.bet
            }
        });
    }

    private log(msg: string): void {
        if (__DEV__) {
            const backgroundColor: string = "#112825";
            const textColor: string = "#50ffd0";
            console.log(`%c${msg}`, `background: ${backgroundColor}; color: ${textColor}`);
        }
    }
}