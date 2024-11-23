import {BaseAwaitableAction} from "./BaseAwaitableAction";
import {WinModel} from "../models/WinModel";
import {IActionInfo} from "../../app/actions/interfaces/IActionInfo";
import {TileView} from "../../reels/views/TileView";
import {WinUtil} from "../utils/WinUtil";

export class ShowWinSymbolsAction extends BaseAwaitableAction {
    private winModel: WinModel = WinModel.getInstance();
    private winUtil: WinUtil = WinUtil.getInstance();

    protected guard(actionInfo: IActionInfo): boolean {
        return this.winModel.winSymbolPositions.length > 0;
    }

    protected internalExecute(): void {
        const promises: Promise<void>[] = [];
        this.winModel.winSymbolPositions.forEach((winSymbolPosition: number[]) => {
            const tile: TileView = this.winUtil.getWinTile(winSymbolPosition);
            promises.push(tile.playAnimation(false));
        });
        Promise.all(promises)
            .then(() => this.readyToFinish());
    }

    protected internalTerminate(): void {
        this.winModel.winSymbolPositions.forEach((winSymbolPosition: number[]) => {
            const tile: TileView = this.winUtil.getWinTile(winSymbolPosition);
            tile.stopAnimation();
        });
        this.readyToFinish();
    }

}