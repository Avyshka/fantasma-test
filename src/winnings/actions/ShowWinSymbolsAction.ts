import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";

export class ShowWinSymbolsAction extends BaseAwaitableAction {
    private winModel: WinModel = WinModel.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return this.winModel.winSymbolPositions.length > 0;
    }

    protected internalExecute(): void {
        // fixme: remove after adding win symbols logic implementation
        console.log("winSymbolPositions:", this.winModel.winSymbolPositions);
        setTimeout(() => this.readyToFinish(), 2000);
    }

    protected internalTerminate(): void {
    }
}