import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {LoadManager} from "../../app/managers/LoadManager";

export class LoadAssetsAction extends Action {

    protected loadManager: LoadManager = new LoadManager();

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return this.loadManager.loadAssets()
            .then(() => super.onExecute(actionInfo));
    }
}