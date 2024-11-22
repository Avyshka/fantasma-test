import {Mediator} from "../../app/mediators/Mediator";
import {AmountBarView} from "../views/AmountBarView";
import {BetModel} from "../models/BetModel";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";
import {MoneyFormatter} from "../../winnings/utils/MoneyFormatter";

export class BetAmountBarMediator extends Mediator {
    protected view: AmountBarView;

    private betModel: BetModel = BetModel.getInstance();
    private moneyFormatter: MoneyFormatter = MoneyFormatter.getInstance();

    protected initialize(): void {
        this.addListenerOnce(GameFlowIntents.INITIALIZE_GAME_DATA, this.onInitGameData);
    }

    private onInitGameData(): void {
        this.view.updateAmount(this.getFormattedValue());
    }

    private getFormattedValue(): string {
        return this.moneyFormatter.format(this.betModel.bet);
    }
}