import * as clone from "clone";
import {GlobalEventProvider} from "../events/GlobalEventProvider";
import {ServerEvents} from "../../server/events/ServerEvents";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";

export abstract class BaseServerModel extends GlobalEventProvider {

    constructor() {
        super();
        this.addListener(ServerEvents.RESPONSE, this.onResponseHandler);
    }

    protected onResponseHandler(data: IServerResponse): void {
        this.parseResponse(clone(data));
    }

    protected abstract parseResponse(data: IServerResponse): void;
}