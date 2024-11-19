import {ActionManager} from "../../app/actions/ActionManager";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {SendGameStatRequestAction} from "../actions/SendGameStatRequestAction";
import {LoadAssetsAction} from "../actions/LoadAssetsAction";
import {BuildMainSceneAction} from "../actions/BuildMainSceneAction";

export class GameLoadingManager {
    private actionManager: ActionManager = new ActionManager();

    constructor() {
        this.actionManager
            .addAction(new SendGameStatRequestAction())
            .addAction(new LoadAssetsAction())
            .addAction(new BuildMainSceneAction());
    }

    public startLoadingGame(): Promise<IActionInfo> {
        return this.actionManager.startAsync({
            shouldForceSpin: false,
            isTerminating: false
        } as IActionInfo);
    }
}