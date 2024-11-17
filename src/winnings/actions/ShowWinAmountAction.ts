import {BaseAwaitableAction} from "./BaseAwaitableAction";

export class ShowWinAmountAction extends BaseAwaitableAction {
    protected internalExecute(): void {
        // fixme: remove after adding win amount logic implementation
        setTimeout(() => this.readyToFinish(), 2000);
    }

    protected internalTerminate(): void {
    }
}