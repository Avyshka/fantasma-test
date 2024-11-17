import {BaseAwaitableAction} from "../../winnings/actions/BaseAwaitableAction";

export class WaitStopReelsAction extends BaseAwaitableAction {

    protected internalExecute(): void {
        this.addListener("ReelsEvents.ALL_REELS_STOPPED", this.readyToFinish);
        this.dispatch("ReelsEvents.STOP_REELS");

        // fixme: remove after reels logic implementation
        setTimeout(() => this.dispatch("ReelsEvents.ALL_REELS_STOPPED"), 3000);
    }

    protected internalTerminate(): void {
        // no needed
    }
}