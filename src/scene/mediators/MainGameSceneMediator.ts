import {Mediator} from "../../app/mediators/Mediator";
import {MainGameSceneView} from "../views/MainGameSceneView";
import {Container} from "../../export";
import {LayoutIntents} from "../../app/views/events/LayoutIntents";

export class MainGameSceneMediator extends Mediator {
    protected view: MainGameSceneView;

    protected initialize(): void {
        this.addListener(LayoutIntents.ADD_CHILD, this.onAddChild);
    }

    private onAddChild(child: Container): void {
        this.view.addChild(child);
    }
}