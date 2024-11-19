import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {BottomBarView} from "../../ui/views/BottomBarView";
import {BottomBarMediator} from "../../ui/mediators/BottomBarMediator";

export class BuildMainSceneAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.buildMainScene();
        return super.onExecute(actionInfo);
    }

    private buildMainScene(): void {
        new BottomBarMediator().setView(new BottomBarView());
    }
}