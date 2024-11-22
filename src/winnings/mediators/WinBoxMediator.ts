import {WinBoxView} from "../views/WinBoxView";
import {LayoutMediator} from "../../app/mediators/LayoutMediator";
import {WinBoxIntents} from "../events/WinBoxIntents";
import {WinBoxEvents} from "../events/WinBoxEvents";
import {MoneyFormatter} from "../utils/MoneyFormatter";

export class WinBoxMediator extends LayoutMediator {
    protected view: WinBoxView;

    private moneyFormatter: MoneyFormatter = MoneyFormatter.getInstance();

    protected initialize(): void {
        super.initialize();
        this.addListener(WinBoxIntents.SHOW, this.onShowWinBox);
        this.addListener(WinBoxIntents.HIDE, this.onHideWinBox);
        this.addListener(WinBoxEvents.VALUE_CHANGED, this.onHideWinValueChanged);
    }

    private onShowWinBox(): void {
        this.view.show();
    }

    private onHideWinBox(): void {
        this.view.hide();
    }

    private onHideWinValueChanged(value: number): void {
        this.view.updateAmount(this.moneyFormatter.format(value));
    }
}