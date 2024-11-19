import {BaseView} from "../../app/views/BaseView";
import {SpinButtonView} from "./SpinButtonView";
import {SpinButtonMediator} from "../mediators/SpinButtonMediator";
import {AmountBarView} from "./AmountBarView";
import {BalanceAmountBarMediator} from "../mediators/BalanceAmountBarMediator";
import {BetAmountBarMediator} from "../mediators/BetAmountBarMediator";
import {AppConstants} from "../../app/AppConstants";
import {SceneContainerViewEvents} from "../../scene/events/SceneContainerViewEvents";

export class BottomBarView extends BaseView {

    public buildLayout(): void {
        this.createBetBar();
        this.createBalanceBar();
        this.createSpinButton();

        this.x = AppConstants.width * 0.5;
        this.y = AppConstants.height - this.getBounds().height * 0.5;

        this.emit(SceneContainerViewEvents.ADD_CHILD_TO_SCENE);
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