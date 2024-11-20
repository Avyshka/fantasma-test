import {BaseView} from "./BaseView";
import {LayoutViewEvents} from "./events/LayoutViewEvents";

export abstract class LayoutView extends BaseView {

    public buildLayout(): void {
        this.create();
        this.emit(LayoutViewEvents.ADD_CHILD_TO_SCENE);
    }

    protected abstract create(): void;
}