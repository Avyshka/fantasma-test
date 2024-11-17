import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {ServerEvents} from "../../server/events/ServerEvents";

export class SendGameStatRequestAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return new Promise(resolve => {
            this.addListenerOnce(ServerEvents.RESPONSE, () => resolve(actionInfo));
            this.dispatch(ServerEvents.SEND_INIT_REQUEST_TO_SERVER_CONNECTOR);
        });
    }
}