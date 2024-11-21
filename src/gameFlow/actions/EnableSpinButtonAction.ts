import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";

export class EnableSpinButtonAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        actionInfo.isTerminating = false;
        this.dispatch(SpinButtonIntents.CHANGE_STATE, true);
        return super.onExecute(actionInfo);
    }
}