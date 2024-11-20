import {MachineView} from "../views/MachineView";
import {ReelsIntents} from "../events/ReelsIntents";
import {ReelsEvents} from "../events/ReelsEvents";
import {ReelsViewEvents} from "../events/ReelsViewEvents";
import {Mediator} from "../../app/mediators/Mediator";

export class MachineMediator extends Mediator {
    protected view: MachineView;

    protected initialize(): void {
        this.addListener(ReelsIntents.START_REELS, this.onStartReels);
        this.addListener(ReelsIntents.STOP_REELS, this.onStopReels);
        this.addListener(ReelsIntents.FORCE_STOP_REELS, this.onForceStopReels);

        this.addViewListener(ReelsViewEvents.ALL_REELS_STOPPED, this.onAllReelsStopped);
    }

    private onStartReels(): void {
        this.view.startSpinning();
    }

    private onStopReels(): void {
        this.view.stop();
    }

    private onForceStopReels(): void {
        this.view.forceStop();
    }

    private onAllReelsStopped(): void {
        this.dispatch(ReelsEvents.ALL_REELS_STOPPED);
    }
}