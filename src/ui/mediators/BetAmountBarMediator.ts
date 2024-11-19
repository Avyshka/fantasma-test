import {Mediator} from "../../app/mediators/Mediator";
import {AmountBarView} from "../views/AmountBarView";
import {BalanceModel} from "../models/BalanceModel";
import {BalanceBarIntents} from "../events/BalanceBarIntents";
import {BetModel} from "../models/BetModel";

export class BetAmountBarMediator extends Mediator {
    protected view: AmountBarView;

    private betModel: BetModel = BetModel.getInstance();
    private balanceModel: BalanceModel = BalanceModel.getInstance();

    protected initialize(): void {
        // todo: change to init event
        this.addListener(BalanceBarIntents.UPDATE_VIEW_BALANCE, this.onUpdateViewBalance);
    }

    private onUpdateViewBalance(): void {
        this.view.updateAmount(this.getFormattedValue());
    }

    private getFormattedValue(): string {
        return `${this.balanceModel.currency} ${this.betModel.bet}`;
    }
}