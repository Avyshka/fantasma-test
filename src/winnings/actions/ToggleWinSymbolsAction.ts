import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {TileView} from "../../reels/views/TileView";
import {WinUtil} from "../utils/WinUtil";

export class ToggleWinSymbolsAction extends BaseAwaitableAction {
    private winModel: WinModel = WinModel.getInstance();
    private winUtil: WinUtil = WinUtil.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return !actionInfo.isTerminating && this.winModel.winSymbolPositions.length > 0;
    }

    protected internalExecute(): void {
        this.winModel.winSymbolPositions.forEach((winSymbolPosition: number[]) => {
            const tile: TileView = this.winUtil.getWinTile(winSymbolPosition);
            tile.playAnimation(true);
        });
    }

    protected internalTerminate(): void {
        this.winModel.winSymbolPositions.forEach((winSymbolPosition: number[]) => {
            const tile: TileView = this.winUtil.getWinTile(winSymbolPosition);
            tile.stopAnimation();
        });
        this.readyToFinish();
    }
}