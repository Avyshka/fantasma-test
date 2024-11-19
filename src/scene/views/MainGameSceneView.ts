import {BaseView} from "../../app/views/BaseView";
import {Graphics} from "../../export";
import {AppConstants} from "../../AppConstants";

export class MainGameSceneView extends BaseView {
    constructor() {
        super();

        const background: Graphics = new Graphics();
        background.beginFill(0xFFFFFF, 0.1);
        background.drawRect(0, 0, AppConstants.width, AppConstants.height);
        this.addChild(background);
    }
}