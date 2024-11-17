import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";
import {ServerService} from "../../server/service/ServerService";

export class DoSpinRequestAction extends Action {

    private serverService: ServerService = new ServerService();

    public onExecute(actionInfo: IReelsActionInfo): Promise<IActionInfo> {
        actionInfo.spinResponsePromise = this.serverService.requestResult();
        return super.onExecute(actionInfo);
    }
}