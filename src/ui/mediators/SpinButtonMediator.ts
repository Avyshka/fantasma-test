import {Mediator} from "../../app/mediators/Mediator";
import {SpinButtonView} from "../views/SpinButtonView";
import {SpinButtonViewEvents} from "../events/SpinButtonViewEvents";

export class SpinButtonMediator extends Mediator {
    protected view: SpinButtonView;

    protected initialize(): void {
        this.addViewListener(SpinButtonViewEvents.SPIN_BUTTON_CLICKED, this.onSpinButtonClicked);
    }

    private onSpinButtonClicked(): void {
        console.log("spin button clicked");
    }
}