import {Mediator} from "../../app/mediators/Mediator";
import {AmountBarView} from "../views/AmountBarView";
import {WinBoxEvents} from "../../winnings/events/WinBoxEvents";
import {ReelsIntents} from "../../reels/events/ReelsIntents";
import {MoneyFormatter} from "../../winnings/utils/MoneyFormatter";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";

export class WinAmountBarMediator extends Mediator {
    protected view: AmountBarView;

    private moneyFormatter: MoneyFormatter = MoneyFormatter.getInstance();

    protected initialize(): void {
        this.addListenerOnce(GameFlowIntents.INITIALIZE_GAME_DATA, this.onInitData);
        this.addListener(WinBoxEvents.VALUE_CHANGED, this.onWinValueChanged);
        this.addListener(ReelsIntents.START_REELS, this.onStartReels);
    }

    private onInitData(): void {
        this.updateAmount(0);
    }

    private onWinValueChanged(value: number): void {
        this.updateAmount(value);
    }

    private onStartReels(): void {
        this.updateAmount(0);
    }

    private updateAmount(value: number): void {
        this.view.updateAmount(this.moneyFormatter.format(value));
    }
}