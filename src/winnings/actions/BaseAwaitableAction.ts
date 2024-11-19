import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";

export abstract class BaseAwaitableAction extends Action {
    protected mainResolve: (actionInfo: IActionInfo) => void;
    protected mainActionInfo: IActionInfo;

    protected terminateResolve: (actionInfo: IActionInfo) => void;
    protected terminateActionInfo: IActionInfo;

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return new Promise(resolve => {
            this.mainResolve = resolve;
            this.mainActionInfo = actionInfo;

            this.terminateResolve = null;
            this.terminateActionInfo = null;

            this.internalExecute();
        });
    }

    public onTerminate(actionInfo: IActionInfo): Promise<IActionInfo> {
        return new Promise(resolve => {
            this.terminateResolve = resolve;
            this.terminateActionInfo = actionInfo;
            this.internalTerminate();
        });
    }

    protected readyToFinish(): void {
        this.destroy();
        if (this.terminateResolve) {
            this.terminateResolve(this.terminateActionInfo);
        } else {
            this.mainResolve(this.mainActionInfo);
        }
    }

    protected abstract internalExecute(): void;

    protected abstract internalTerminate(): void;
}