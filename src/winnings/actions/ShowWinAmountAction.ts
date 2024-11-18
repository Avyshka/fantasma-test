import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";

export class ShowWinAmountAction extends BaseAwaitableAction {

    private winModel: WinModel = WinModel.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return this.winModel.totalWin > 0;
    }

    protected internalExecute(): void {
        // fixme: remove after adding win amount logic implementation
        console.log("total win:", this.winModel.totalWin);
        setTimeout(() => this.readyToFinish(), 2000);
    }

    protected internalTerminate(): void {
    }
}