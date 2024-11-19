import {Mediator} from "../../app/mediators/Mediator";
import {AmountBarView} from "../views/AmountBarView";
import {BalanceModel} from "../models/BalanceModel";
import {BalanceBarIntents} from "../events/BalanceBarIntents";

export class BalanceAmountBarMediator extends Mediator {
    protected view: AmountBarView;

    private balanceModel: BalanceModel = BalanceModel.getInstance();

    protected initialize(): void {
        this.addListener(BalanceBarIntents.UPDATE_VIEW_BALANCE, this.onUpdateViewBalance);
    }

    private onUpdateViewBalance(): void {
        this.view.updateAmount(this.getFormattedValue());
    }

    private getFormattedValue(): string {
        return `${this.balanceModel.currency} ${this.balanceModel.balance}`;
    }
}