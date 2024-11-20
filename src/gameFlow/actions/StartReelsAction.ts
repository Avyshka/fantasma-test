import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {ReelsIntents} from "../../reels/events/ReelsIntents";

export class StartReelsAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.dispatch(ReelsIntents.START_REELS);
        return super.onExecute(actionInfo);
    }
}