import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";
import {BalanceModel} from "../../ui/models/BalanceModel";
import {BetModel} from "../../ui/models/BetModel";
import {BalanceBarIntents} from "../../ui/events/BalanceBarIntents";

export class DeductBetFromBalanceAction extends Action {

    private balanceModel: BalanceModel = BalanceModel.getInstance();
    private betModel: BetModel = BetModel.getInstance();

    public onExecute(actionInfo: IReelsActionInfo): Promise<IActionInfo> {
        this.balanceModel.balance -= this.betModel.bet;
        this.dispatch(BalanceBarIntents.UPDATE_VIEW_BALANCE);
        return super.onExecute(actionInfo);
    }
}