import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {ReelsViewModel} from "../../reels/models/ReelsViewModel";
import {ReelsConstants} from "../../reels/ReelsConstants";
import {TileView} from "../../reels/views/TileView";

export class ToggleWinSymbolsAction extends BaseAwaitableAction {
    private winModel: WinModel = WinModel.getInstance();
    private reelsViewModel: ReelsViewModel = ReelsViewModel.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return !actionInfo.isTerminating && this.winModel.winSymbolPositions.length > 0;
    }

    protected internalExecute(): void {
        this.winModel.winSymbolPositions.forEach((winSymbolPosition: number[]) => {
            const tile: TileView = this.getWinTile(winSymbolPosition);
            tile.playAnimation(true);
        });
    }

    protected internalTerminate(): void {
        this.winModel.winSymbolPositions.forEach((winSymbolPosition: number[]) => {
            const tile: TileView = this.getWinTile(winSymbolPosition);
            tile.stopAnimation();
        });
        this.readyToFinish();
    }

    private getWinTile(position: number[]): TileView {
        const reelId: number = position[0];
        const lineId: number = position[1];
        return this.reelsViewModel.singleReelModels[reelId].getTiles()[lineId + ReelsConstants.EXTRA_LINES];
    }
}