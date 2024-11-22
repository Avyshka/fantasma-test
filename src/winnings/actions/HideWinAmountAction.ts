import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {WinBoxIntents} from "../events/WinBoxIntents";
import {WinBoxConstants} from "../WinBoxConstants";

export class HideWinAmountAction extends BaseAwaitableAction {

    private winModel: WinModel = WinModel.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return this.winModel.totalWin > 0;
    }

    protected internalExecute(): void {
        const timeOutDuration: number = this.mainActionInfo.isTerminating
            ? WinBoxConstants.DELAY_BEFORE_HIDE_IN_TERMINATE
            : WinBoxConstants.DELAY_BEFORE_HIDE;
        setTimeout(() => this.readyToFinish(), timeOutDuration);
    }

    protected internalTerminate(): void {
        // no needed
    }

    protected readyToFinish(): void {
        super.readyToFinish();
        this.dispatch(WinBoxIntents.HIDE);
    }
}