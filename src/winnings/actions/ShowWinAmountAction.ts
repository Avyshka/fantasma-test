import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {BalanceBarIntents} from "../../ui/events/BalanceBarIntents";
import {WinBoxModel} from "../models/WinBoxModel";
import {Sine, TweenMax} from "gsap";
import {WinBoxConstants} from "../WinBoxConstants";
import {WinBoxIntents} from "../events/WinBoxIntents";

export class ShowWinAmountAction extends BaseAwaitableAction {

    private winModel: WinModel = WinModel.getInstance();
    private winBoxModel: WinBoxModel = WinBoxModel.getInstance();

    private tweenObj: { win: number } = {win: 0};

    protected guard(actionInfo: IActionInfo): boolean {
        return this.winModel.totalWin > 0;
    }

    protected internalExecute(): void {
        this.winBoxModel.currentAmount = 0;
        this.dispatch(WinBoxIntents.SHOW);
        if (this.mainActionInfo.isTerminating) {
            this.readyToFinish();
        } else {
            this.playWinTickUpAnimation();
        }
    }

    protected internalTerminate(): void {
        TweenMax.killTweensOf(this.winBoxModel);
        this.readyToFinish();
    }

    protected readyToFinish(): void {
        super.readyToFinish();
        this.winBoxModel.currentAmount = this.winModel.totalWin;
        this.dispatch(BalanceBarIntents.UPDATE_VIEW_BALANCE);
    }

    private playWinTickUpAnimation(): void {
        TweenMax.to(this.tweenObj, this.getTickUpTime(), {
            win: this.winModel.totalWin,
            ease: Sine.easeInOut,
            onUpdate: () => this.winBoxModel.currentAmount = this.tweenObj.win,
            onComplete: () => this.readyToFinish()
        });
    }

    private getTickUpTime(): number {
        return WinBoxConstants.TICK_UP_TIME;
    }
}