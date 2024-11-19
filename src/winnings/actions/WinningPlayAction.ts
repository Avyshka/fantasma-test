import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {ActionManager} from "../../app/actions/ActionManager";
import {IAction} from "../../app/actions/interfaces/IAction";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";
import {ShowWinAmountAction} from "./ShowWinAmountAction";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";
import {ShowWinSymbolsAction} from "./ShowWinSymbolsAction";

export class WinningPlayAction extends Action {
    protected actionManager: ActionManager = new ActionManager();
    protected actionInfo: IActionInfo;

    constructor() {
        super();

        for (const action of this.getActionSequence()) {
            this.actionManager.addAction(action);
        }

        this.actionManager.onStart = () => this.addInternalListeners();
        this.actionManager.onFinish = () => this.removeInternalListeners();
    }

    private addInternalListeners(): void {
        this.addListener(GameFlowIntents.START_SPIN, this.onSpinStartRequested);
    }

    private removeInternalListeners(): void {
        this.removeListener(GameFlowIntents.START_SPIN, this.onSpinStartRequested);
    }

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.actionInfo = actionInfo;

        return new Promise(resolve => {
            this.actionManager
                .startAsync(actionInfo)
                .then(() => resolve(actionInfo));
        });
    }

    protected getActionSequence(): IAction[] {
        return [
            new ShowWinSymbolsAction(),
            new ShowWinAmountAction()
        ];
    }

    protected isTerminable(): boolean {
        return false;
    }

    protected onSpinStartRequested() {
        this.actionInfo.shouldForceSpin = true;
        this.actionInfo.isTerminating = true;

        this.actionManager.terminate();
        this.dispatch(SpinButtonIntents.CHANGE_STATE, false);
    }
}
