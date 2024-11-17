import {Action} from "../../app/actions/Action";
import {ActionManager} from "../../app/actions/ActionManager";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {ReelsPlayAction} from "./ReelsPlayAction";
import {WinningPlayAction} from "../../winnings/actions/WinningPlayAction";

export class RunGameAction extends Action {
    private actionManager: ActionManager;

    private createActionManager(): void {
        this.actionManager = new ActionManager();
        this.actionManager.onFinish = (actionInfo: IActionInfo) => {
            this.start(actionInfo);
        };
    }

    private addActions(): void {
        this.actionManager
            .addAction(new ReelsPlayAction())
            .addAction(new WinningPlayAction());
    }

    protected isTerminable(): boolean {
        return false;
    }

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return new Promise(() => {
            this.start(actionInfo);
        });
    }

    private start(actionInfo: IActionInfo): void {
        this.createActionManager();
        this.addActions();
        this.actionManager.start(actionInfo);
    }
}
