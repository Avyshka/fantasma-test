import {BaseAwaitableAction} from "./BaseAwaitableAction";

export class ShowWinSymbolsAction extends BaseAwaitableAction {
    protected internalExecute(): void {
        // fixme: remove after adding win symbols logic implementation
        setTimeout(() => this.readyToFinish(), 2000);
    }

    protected internalTerminate(): void {
    }
}