import {SpinButtonView} from "../views/SpinButtonView";
import {SpinButtonViewEvents} from "../events/SpinButtonViewEvents";
import {SpinButtonIntents} from "../events/SpinButtonIntents";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";
import {ReelsStatesModel} from "../../reels/models/ReelsStatesModel";
import {LayoutMediator} from "../../app/mediators/LayoutMediator";

export class SpinButtonMediator extends LayoutMediator {
    protected view: SpinButtonView;

    private reelsStatesModel: ReelsStatesModel = ReelsStatesModel.getInstance();

    protected initialize(): void {
        super.initialize();
        this.addViewListener(SpinButtonViewEvents.SPIN_BUTTON_CLICKED, this.onSpinButtonClicked);
        this.addListener(SpinButtonIntents.CHANGE_STATE, this.onChangeState);
    }

    private onSpinButtonClicked(): void {
        if (this.reelsStatesModel.isAllReelsStopped()) {
            this.dispatch(GameFlowIntents.START_SPIN);
        } else {
            this.dispatch(GameFlowIntents.STOP_SPIN);
        }
    }

    private onChangeState(value: boolean): void {
        this.view.changeInteractivity(value);
    }
}