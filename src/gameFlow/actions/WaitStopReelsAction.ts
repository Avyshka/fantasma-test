import {BaseAwaitableAction} from "../../winnings/actions/BaseAwaitableAction";
import {ReelsIntents} from "../../reels/events/ReelsIntents";
import {ReelsEvents} from "../../reels/events/ReelsEvents";
import {ReelsStatesModel} from "../../reels/models/ReelsStatesModel";
import {SpinButtonIntents} from "../../ui/events/SpinButtonIntents";

export class WaitStopReelsAction extends BaseAwaitableAction {

    private reelsStatesModel: ReelsStatesModel = ReelsStatesModel.getInstance();

    protected internalExecute(): void {
        this.addListener(ReelsEvents.ALL_REELS_STOPPED, this.readyToFinish);
        Promise.all(this.reelsStatesModel.reelStartingPromises)
            .then(() => {
                this.dispatch(SpinButtonIntents.CHANGE_STATE, true);
                this.dispatch(ReelsIntents.STOP_REELS);
            });
    }

    protected internalTerminate(): void {
        // no needed
    }
}