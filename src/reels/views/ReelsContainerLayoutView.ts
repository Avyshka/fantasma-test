import {AppConstants} from "../../AppConstants";
import {LayoutView} from "../../app/views/LayoutView";
import {Graphics, Sprite, Texture} from "../../export";
import {MachineMediator} from "../mediators/MachineMediator";
import {MachineView} from "./MachineView";
import {ReelsConstants} from "../ReelsConstants";

export class ReelsContainerLayoutView extends LayoutView {

    protected create(): void {
        this.createBackground();
        this.createMachine();

        this.x = AppConstants.width * 0.5;
        this.y = (AppConstants.height - AppConstants.bottomBarHeight) * 0.5;
    }

    private createBackground(): void {
        const startPosX: number = -((ReelsConstants.COUNT_REELS - 1) * ReelsConstants.TILE_WIDTH) * 0.5;
        for (let i: number = 0; i < ReelsConstants.COUNT_REELS; i++) {
            const background: Sprite = new Sprite(Texture.from(AppConstants.images.REELS_BACKGROUND));
            background.anchor.set(0.5);
            background.x = startPosX + ReelsConstants.TILE_WIDTH * i;
            this.addChild(background);
        }
    }

    private createMachine(): void {
        const machineView: MachineView = new MachineView();
        this.addChild(machineView);
        machineView.mask = this.getMask();

        new MachineMediator().setView(machineView);
    }

    private getMask(): Graphics {
        const mask: Graphics = new Graphics();

        const width: number = ReelsConstants.COUNT_REELS * ReelsConstants.TILE_WIDTH;
        const height: number = ReelsConstants.COUNT_LINES * ReelsConstants.TILE_HEIGHT;
        mask.drawRect(
            -width * 0.5,
            -height * 0.5,
            width,
            height
        );
        this.addChild(mask);

        return mask;
    }
}