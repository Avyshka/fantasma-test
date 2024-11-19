import {ActionManager} from "../../app/actions/ActionManager";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {RunGameAction} from "../actions/RunGameAction";

export class GameFlowManager {
    private actionManager: ActionManager = new ActionManager();

    constructor() {
        this.actionManager
            // todo: update data InitGameDataAction
            .addAction(new RunGameAction());
    }

    public startGame(): void {
        this.actionManager.start({
            shouldForceSpin: false,
            isTerminating: false
        } as IActionInfo);
    }
}