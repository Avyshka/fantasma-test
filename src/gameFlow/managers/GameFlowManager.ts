import {ActionManager} from "../../app/actions/ActionManager";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {RunGameAction} from "../actions/RunGameAction";
import {SendGameStatRequestAction} from "../actions/SendGameStatRequestAction";

export class GameFlowManager {
    private actionManager: ActionManager = new ActionManager();

    constructor() {
        this.actionManager
            .addAction(new SendGameStatRequestAction())
            .addAction(new RunGameAction());
    }

    public startGame(): void {
        this.actionManager.start({
            isSuccess: true,
            isTerminating: false
        } as IActionInfo);
    }
}