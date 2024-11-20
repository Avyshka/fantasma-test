import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {ReelsIntents} from "../../reels/events/ReelsIntents";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";

export class StartReelsAction extends Action {

    public onExecute(actionInfo: IReelsActionInfo): Promise<IActionInfo> {
        actionInfo.spinStartTime = Date.now();
        this.dispatch(ReelsIntents.START_REELS);
        return super.onExecute(actionInfo);
    }
}