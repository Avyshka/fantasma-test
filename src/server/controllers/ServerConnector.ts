import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {ServerEvents} from "../events/ServerEvents";
import {Server} from "../Server";

export class ServerConnector extends GlobalEventProvider {

    private server: Server = new Server();

    constructor() {
        super();
        this.addListener(ServerEvents.SEND_RESPONSE_TO_SERVER_CONNECTOR, this.onResponse); // from server
        this.addListener(ServerEvents.SEND_INIT_REQUEST_TO_SERVER_CONNECTOR, this.onInitRequest); // to server
        this.addListener(ServerEvents.SEND_PLAY_REQUEST_TO_SERVER_CONNECTOR, this.onPlayRequest); // to server
    }

    protected onResponse(data: any): void {
        this.log("ServerEvent.RESPONSE");
        console.log(data);
        this.dispatch(ServerEvents.RESPONSE, data);
    }

    protected onInitRequest(): void {
        this.log("ServerEvent.SEND_INIT_REQUEST_TO_SERVER_CONNECTOR");
        this.server.playRequest({
            message: "init",
            payload: null
        });
    }

    protected onPlayRequest(): void {
        this.log("ServerEvent.SEND_PLAY_REQUEST_TO_SERVER_CONNECTOR");
        this.server.playRequest({
            message: "spin",
            payload: {
                bet: 1
            }
        });
    }

    protected log(msg: string): void {
        if (__DEV__) {
            const backgroundColor: string = "#11281b";
            const textColor: string = "#50ff7d";
            console.log(`%c${msg}`, `background: ${backgroundColor}; color: ${textColor}`);
        }
    }
}