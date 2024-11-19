import {Mediator} from "../../app/mediators/Mediator";
import {AmountBarView} from "../views/AmountBarView";
import {BalanceModel} from "../models/BalanceModel";
import {BalanceBarIntents} from "../events/BalanceBarIntents";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";

export class BalanceAmountBarMediator extends Mediator {
    protected view: AmountBarView;

    private balanceModel: BalanceModel = BalanceModel.getInstance();

    protected initialize(): void {
        this.addListenerOnce(GameFlowIntents.INITIALIZE_GAME_DATA, this.onInitGameData);
        this.addListener(BalanceBarIntents.UPDATE_VIEW_BALANCE, this.onUpdateViewBalance);
    }

    private onInitGameData(): void {
        this.updateAmount();
    }

    private onUpdateViewBalance(): void {
        this.updateAmount();
    }

    private updateAmount(): void {
        this.view.updateAmount(this.getFormattedValue());
    }

    private getFormattedValue(): string {
        return `${this.balanceModel.currency} ${this.balanceModel.balance}`;
    }
}