import {Action} from "../../app/actions/Action";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";
import {GameFlowIntents} from "../events/GameFlowIntents";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";

export class WaitSpinAction extends Action {
    private mainResolve: Function;
    private actionInfo: IReelsActionInfo;

    protected isTerminable(): boolean {
        return false;
    }

    public onExecute(actionInfo: IReelsActionInfo): Promise<IReelsActionInfo> {
        return new Promise(resolve => {
            this.mainResolve = resolve;
            this.actionInfo = actionInfo;

            this.addListener(GameFlowIntents.START_SPIN, this.onSpinStartRequested);
        });
    }

    private onSpinStartRequested(): void {
        this.startWithCheck(this.actionInfo);
    }

    private startWithCheck(actionInfo: IReelsActionInfo): void {
        if (this.isAbleToSpin()) {
            this.onSpinStarted(actionInfo);
        } else {
            this.onSpinFailed(actionInfo);
        }
    }

    private isAbleToSpin(): boolean {
        return true; // fixme: check to hasEnoughBalance
    }

    private onSpinStarted(actionInfo: IReelsActionInfo): void {
        actionInfo.isTerminating = false;
        this.dispatch(SpinButtonIntents.CHANGE_STATE, false);
        this.readyToResolve(actionInfo);
    }

    private onSpinFailed(actionInfo: IReelsActionInfo): void {
        // todo: lock UI or show info popup?
    }

    private readyToResolve(actionInfo: IReelsActionInfo): void {
        this.removeListener(GameFlowIntents.START_SPIN, this.onSpinStartRequested);
        this.mainResolve(actionInfo);
    }
}
