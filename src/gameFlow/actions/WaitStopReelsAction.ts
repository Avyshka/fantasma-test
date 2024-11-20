import {BaseAwaitableAction} from "../../winnings/actions/BaseAwaitableAction";
import {ReelsIntents} from "../../reels/events/ReelsIntents";
import {ReelsEvents} from "../../reels/events/ReelsEvents";
import {ReelsStatesModel} from "../../reels/models/ReelsStatesModel";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";
import {IReelsActionInfo} from "../../app/actions/interfaces/IReelsActionInfo";
import {ReelsConstants} from "../../reels/ReelsConstants";

export class WaitStopReelsAction extends BaseAwaitableAction {

    protected mainActionInfo: IReelsActionInfo;

    private reelsStatesModel: ReelsStatesModel = ReelsStatesModel.getInstance();
    private timeout: any;

    protected internalExecute(): void {
        this.addListener(ReelsEvents.ALL_REELS_STOPPED, this.readyToFinish);
        Promise.all(this.reelsStatesModel.reelStartingPromises)
            .then(() => {
                this.dispatch(SpinButtonIntents.CHANGE_STATE, true);
                const spinTime: number = ReelsConstants.MIN_SPIN_DURATION - (Date.now() - this.mainActionInfo.spinStartTime);
                this.scheduleStop(spinTime);
            });
    }

    private scheduleStop(spinTime: number): void {
        if (spinTime > 0) {
            this.timeout = setTimeout(() => this.dispatch(ReelsIntents.STOP_REELS), spinTime);
        } else {
            this.dispatch(ReelsIntents.STOP_REELS);
        }
    }

    protected internalTerminate(): void {
        // no needed
    }

    protected readyToFinish(): void {
        super.readyToFinish();
        clearTimeout(this.timeout);
    }
}