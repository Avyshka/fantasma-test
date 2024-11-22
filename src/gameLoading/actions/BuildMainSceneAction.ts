import {Action} from "../../app/actions/Action";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {BottomBarView} from "../../ui/views/BottomBarView";
import {LayoutMediator} from "../../app/mediators/LayoutMediator";
import {ReelsContainerLayoutView} from "../../reels/views/ReelsContainerLayoutView";
import {WinBoxMediator} from "../../winnings/mediators/WinBoxMediator";
import {WinBoxView} from "../../winnings/views/WinBoxView";

export class BuildMainSceneAction extends Action {

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        this.buildMainScene();
        return super.onExecute(actionInfo);
    }

    private buildMainScene(): void {
        new LayoutMediator().setView(new ReelsContainerLayoutView());
        new LayoutMediator().setView(new BottomBarView());
        new WinBoxMediator().setView(new WinBoxView());
    }
}