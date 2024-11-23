import {ReelsViewModel} from "../../reels/models/ReelsViewModel";
import {TileView} from "../../reels/views/TileView";
import {ReelsConstants} from "../../reels/ReelsConstants";

export class WinUtil {

    private static instance: WinUtil;

    private reelsViewModel: ReelsViewModel = ReelsViewModel.getInstance();

    private constructor() {
    }

    public static getInstance(): WinUtil {
        if (!WinUtil.instance) {
            WinUtil.instance = new WinUtil();
        }
        return WinUtil.instance;
    }

    public getWinTile(position: number[]): TileView {
        const reelId: number = position[0];
        const lineId: number = position[1];
        return this.reelsViewModel.singleReelModels[reelId]
            .getTiles()[lineId + ReelsConstants.EXTRA_LINES];
    }
}