import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";
import {BalanceModel} from "../../ui/models/BalanceModel";
import {BetModel} from "../../ui/models/BetModel";

export class DisableSpinButtonAction extends Action {

    private balanceModel: BalanceModel = BalanceModel.getInstance();
    private betModel: BetModel = BetModel.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return this.betModel.bet > this.balanceModel.balance;
    }

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.dispatch(SpinButtonIntents.CHANGE_STATE, false);
        return super.onExecute(actionInfo);
    }
}