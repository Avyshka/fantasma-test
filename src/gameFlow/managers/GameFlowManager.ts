import {ActionManager} from "../../app/actions/ActionManager";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {RunGameAction} from "../actions/RunGameAction";
import {InitGameDataAction} from "../actions/InitGameDataAction";

export class GameFlowManager {
    private actionManager: ActionManager = new ActionManager();

    constructor() {
        this.actionManager
            .addAction(new InitGameDataAction())
            .addAction(new RunGameAction());
    }

    public startGame(): void {
        this.actionManager.start({
            shouldForceSpin: false,
            isTerminating: false
        } as IActionInfo);
    }
}