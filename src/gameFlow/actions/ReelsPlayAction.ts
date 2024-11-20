import {Action} from "../../app/actions/Action";
import {ActionManager} from "../../app/actions/ActionManager";
import {WaitSpinAction} from "./WaitSpinAction";
import {Constructor} from "../../app/types/Type";
import {IAction} from "../../app/actions/interfaces/IAction";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";
import {GameFlowIntents} from "../events/GameFlowIntents";
import {DoSpinRequestAction} from "./DoSpinRequestAction";
import {StartReelsAction} from "./StartReelsAction";
import {WaitResponseAction} from "./WaitResponseAction";
import {WaitStopReelsAction} from "./WaitStopReelsAction";
import {DeductBetFromBalanceAction} from "./DeductBetFromBalanceAction";
import {EnableSpinButtonAction} from "./EnableSpinButtonAction";
import {ReelsIntents} from "../../reels/events/ReelsIntents";

export class ReelsPlayAction extends Action {
    private actionManager: ActionManager = new ActionManager();

    constructor() {
        super();
        this.initialize();
    }

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return this.runChain(actionInfo);
    }

    private getActionSequence(): Constructor<IAction>[] {
        return [
            WaitSpinAction,
            DoSpinRequestAction,
            DeductBetFromBalanceAction,
            StartReelsAction,
            WaitResponseAction,
            WaitStopReelsAction,
            EnableSpinButtonAction
        ];
    }

    private onReadyToStop(): void {
        this.onReadyToStopChangeUI();
        this.dispatch(ReelsIntents.FORCE_STOP_REELS);
        this.actionManager.terminate();
    }

    private onReadyToStopChangeUI(): void {
        this.dispatch(SpinButtonIntents.CHANGE_STATE, false);
    }

    protected isTerminable(): boolean {
        return false;
    }

    private setListeners(): void {
        this.addListener(GameFlowIntents.STOP_SPIN, this.onReadyToStop);
    }

    private removeInternalListeners(): void {
        this.removeListener(GameFlowIntents.STOP_SPIN, this.onReadyToStop);
    }

    private runChain(actionInfo: IActionInfo): Promise<IActionInfo> {
        return new Promise(resolve => {
            this.actionManager.start(
                (<any>Object).assign(actionInfo, {
                    spinStartTime: 0,
                    spinResponsePromise: null,
                    isTerminating: actionInfo.isTerminating,
                    isSuccess: true,
                }) as IActionInfo
            );

            this.actionManager.onFinish = (actionInfo: IReelsActionInfo) => {
                resolve(actionInfo);
                this.removeInternalListeners();
            };
        });
    }

    private initialize(): void {
        const actionSequence: Constructor<IAction>[] = this.getActionSequence();
        for (const action of actionSequence) {
            this.actionManager.addAction(new action());
        }
        this.actionManager.onStart = () => this.setListeners();
    }
}
