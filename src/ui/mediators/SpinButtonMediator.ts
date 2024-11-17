import {Mediator} from "../../app/mediators/Mediator";
import {SpinButtonView} from "../views/SpinButtonView";
import {SpinButtonViewEvents} from "../events/SpinButtonViewEvents";
import {SpinButtonIntents} from "../events/SpinButtonIntents";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";

export class SpinButtonMediator extends Mediator {
    protected view: SpinButtonView;

    protected initialize(): void {
        this.addViewListener(SpinButtonViewEvents.SPIN_BUTTON_CLICKED, this.onSpinButtonClicked);
        this.addListener(SpinButtonIntents.CHANGE_STATE, this.onChangeState);
    }

    private onSpinButtonClicked(): void {
        // todo: check reels spinning state
        if (true) {
            this.dispatch(GameFlowIntents.START_SPIN);
        } else {
            this.dispatch(GameFlowIntents.STOP_SPIN);
        }
    }

    private onChangeState(value: boolean): void {
        this.view.changeInteractivity(value);
    }
}