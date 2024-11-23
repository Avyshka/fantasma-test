import {AmountBarView} from "./AmountBarView";
import {BalanceAmountBarMediator} from "../mediators/BalanceAmountBarMediator";
import {BetAmountBarMediator} from "../mediators/BetAmountBarMediator";
import {AppConstants} from "../../AppConstants";
import {LayoutView} from "../../app/views/LayoutView";
import {Graphics} from "../../export";
import {WinAmountBarMediator} from "../mediators/WinAmountBarMediator";

export class BottomBarView extends LayoutView {

    protected create(): void {
        this.createBackground();
        this.createBalanceBar();
        this.createWinBar();
        this.createBetBar();

        this.x = AppConstants.width * 0.5;
        this.y = AppConstants.height - AppConstants.bottomBarHeight * 0.5;
    }

    private createBackground(): void {
        const background: Graphics = new Graphics();
        background.beginFill(0x000000, 0.7);
        background.drawRect(
            -AppConstants.width * 0.5,
            -AppConstants.bottomBarHeight * 0.5,
            AppConstants.width,
            AppConstants.bottomBarHeight);
        this.addChild(background);
    }

    private createBalanceBar(): void {
        const balanceAmountBarView: AmountBarView = new AmountBarView("balance");
        balanceAmountBarView.x = -AppConstants.width * 0.35;
        this.addChild(balanceAmountBarView);

        new BalanceAmountBarMediator().setView(balanceAmountBarView);
    }

    private createBetBar(): void {
        const betAmountBarView: AmountBarView = new AmountBarView("bet");
        betAmountBarView.x = AppConstants.width * 0.35;
        this.addChild(betAmountBarView);

        new BetAmountBarMediator().setView(betAmountBarView);
    }

    private createWinBar(): void {
        const winAmountBarView: AmountBarView = new AmountBarView("win");
        this.addChild(winAmountBarView);

        new WinAmountBarMediator().setView(winAmountBarView);
    }
}