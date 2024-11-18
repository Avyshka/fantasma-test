import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";
import {IServerResponse} from "../../server/interfaces/ResponseInterfaces";

export class WaitResponseAction extends Action {

    public onExecute(actionInfo: IReelsActionInfo): Promise<IActionInfo> {
        return new Promise(resolve => {
            actionInfo.spinResponsePromise
                .then((response: IServerResponse) => {
                    actionInfo.spinResponsePromise = null;
                    resolve(actionInfo);
                });
        });
    }
}