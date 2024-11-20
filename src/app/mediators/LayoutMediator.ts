import {Mediator} from "./Mediator";
import {LayoutView} from "../views/LayoutView";
import {LayoutViewEvents} from "../views/events/LayoutViewEvents";
import {LayoutIntents} from "../views/events/LayoutIntents";

export class LayoutMediator extends Mediator {
    protected view: LayoutView;

    protected initialize(): void {
        this.addViewListenerOnce(LayoutViewEvents.ADD_CHILD_TO_SCENE, this.onAddChildToScene);
        this.view.buildLayout();
    }

    protected onAddChildToScene(): void {
        this.dispatch(LayoutIntents.ADD_CHILD, this.view);
    }
}