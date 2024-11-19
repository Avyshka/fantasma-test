import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {GameFlowIntents} from "../events/GameFlowIntents";

export class InitGameDataAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.dispatch(GameFlowIntents.INITIALIZE_GAME_DATA);
        return super.onExecute(actionInfo);
    }
}