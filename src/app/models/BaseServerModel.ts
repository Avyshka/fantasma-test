import * as clone from "clone";
import {GlobalEventProvider} from "../events/GlobalEventProvider";
import {ServerEvents} from "../../server/events/ServerEvents";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";
import {ServerRequests} from "../../server/enums/ServerRequests";
import {ServerRequestType} from "../../server/types/ServerRequestType";

export abstract class BaseServerModel extends GlobalEventProvider {

    constructor() {
        super();
        this.addListener(ServerEvents.RESPONSE, this.onResponseHandler);
    }

    protected onResponseHandler(data: IServerResponse): void {
        if (this.getSupportedRequestTypes().indexOf(data.result?.action) > -1) {
            this.parseResponse(clone(data));
        }
    }

    protected abstract parseResponse(data: IServerResponse): void;

    protected getSupportedRequestTypes(): ServerRequestType[] {
        return [
            ServerRequests.INIT,
            ServerRequests.SPIN,
        ];
    }
}