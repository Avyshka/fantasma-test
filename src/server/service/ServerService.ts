import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {ServerEvents} from "../events/ServerEvents";
import {IServerResponse} from "../../gameFlow/interfaces/ResponseInterfaces";

export class ServerService extends GlobalEventProvider {
    public resultPromise: IServerResponse;

    public async requestResult(): Promise<void> {
        this.dispatch(ServerEvents.SEND_PLAY_REQUEST_TO_SERVER_CONNECTOR);
        this.resultPromise = null;
        this.resultPromise = await this.getAnswer();
    }

    private async getAnswer(): Promise<IServerResponse> {
        return new Promise(resolve => {
            this.addListenerOnce(ServerEvents.RESPONSE, (data: IServerResponse) => resolve(data));
        });
    }
}