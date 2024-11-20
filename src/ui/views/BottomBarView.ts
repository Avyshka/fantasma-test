import {SpinButtonView} from "./SpinButtonView";
import {SpinButtonMediator} from "../mediators/SpinButtonMediator";
import {AmountBarView} from "./AmountBarView";
import {BalanceAmountBarMediator} from "../mediators/BalanceAmountBarMediator";
import {BetAmountBarMediator} from "../mediators/BetAmountBarMediator";
import {AppConstants} from "../../AppConstants";
import {LayoutView} from "../../app/views/LayoutView";

export class BottomBarView extends LayoutView {

    protected create(): void {
        this.createBetBar();
        this.createBalanceBar();
        this.createSpinButton();

        this.x = AppConstants.width * 0.5;
        this.y = AppConstants.height - this.getBounds().height * 0.5;
    }

    private createSpinButton(): void {
        const spinButtonView: SpinButtonView = new SpinButtonView();
        this.addChild(spinButtonView);

        new SpinButtonMediator().setView(spinButtonView);
    }

    private createBetBar(): void {
        const balanceAmountBarView: AmountBarView = new AmountBarView("balance");
        balanceAmountBarView.x = 240;
        this.addChild(balanceAmountBarView);

        new BalanceAmountBarMediator().setView(balanceAmountBarView);
    }

    private createBalanceBar(): void {
        const betAmountBarView: AmountBarView = new AmountBarView("bet");
        betAmountBarView.x = -240;
        this.addChild(betAmountBarView);

        new BetAmountBarMediator().setView(betAmountBarView);
    }
}