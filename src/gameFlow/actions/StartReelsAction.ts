import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";

export class StartReelsAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.dispatch("ReelsEvents.START_REELS");
        return super.onExecute(actionInfo);
    }
}