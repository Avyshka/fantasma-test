import {Mediator} from "../../app/mediators/Mediator";
import {AmountBarView} from "../views/AmountBarView";
import {BalanceModel} from "../models/BalanceModel";
import {BetModel} from "../models/BetModel";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";

export class BetAmountBarMediator extends Mediator {
    protected view: AmountBarView;

    private betModel: BetModel = BetModel.getInstance();
    private balanceModel: BalanceModel = BalanceModel.getInstance();

    protected initialize(): void {
        this.addListenerOnce(GameFlowIntents.INITIALIZE_GAME_DATA, this.onInitGameData);
    }

    private onInitGameData(): void {
        this.view.updateAmount(this.getFormattedValue());
    }

    private getFormattedValue(): string {
        return `${this.balanceModel.currency} ${this.betModel.bet}`;
    }
}