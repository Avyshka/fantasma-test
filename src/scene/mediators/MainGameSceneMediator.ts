import {Mediator} from "../../app/mediators/Mediator";
import {MainGameSceneView} from "../views/MainGameSceneView";
import {MainGameSceneIntents} from "../events/MainGameSceneIntents";
import {Container} from "../../export";

export class MainGameSceneMediator extends Mediator {
    protected view: MainGameSceneView;

    protected initialize(): void {
        this.addListener(MainGameSceneIntents.ADD_CHILD, this.onAddChild);
    }

    private onAddChild(child: Container): void {
        this.view.addChild(child);
    }
}