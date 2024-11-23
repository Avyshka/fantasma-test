import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {LoadManager} from "../../app/managers/LoadManager";

export class LoadAssetsAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return new LoadManager()
            .loadAssets()
            .then(() => super.onExecute(actionInfo));
    }
}