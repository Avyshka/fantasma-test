import {Mediator} from "../../app/mediators/Mediator";
import {BottomBarView} from "../views/BottomBarView";
import {SceneContainerViewEvents} from "../../scene/events/SceneContainerViewEvents";
import {MainGameSceneIntents} from "../../scene/events/MainGameSceneIntents";

export class BottomBarMediator extends Mediator {
    protected view: BottomBarView;

    protected initialize(): void {
        this.addViewListenerOnce(SceneContainerViewEvents.ADD_CHILD_TO_SCENE, this.onAddChildToScene);
        this.view.buildLayout();
    }

    private onAddChildToScene(): void {
        this.dispatch(MainGameSceneIntents.ADD_CHILD, this.view);
    }
}