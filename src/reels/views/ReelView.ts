import {BaseView} from "../../app/views/BaseView";
import {TileView} from "./TileView";
import {Tween} from "../../app/utils/Tween";
import {Back, Elastic, Power0, TweenMax} from "gsap";
import {ReelsConstants} from "../ReelsConstants";
import {SpinDirection} from "../enums/SpinDirection";
import {ReelsStatesModel} from "../models/ReelsStatesModel";
import {ReelsStatesEnum} from "../enums/ReelsStatesEnum";
import {ReelsUtil} from "../utils/ReelsUtil";
import {ReelsViewModel} from "../models/ReelsViewModel";
import {SingleReelModel} from "../models/SingleReelModel";

export class ReelView extends BaseView {

    private reelsStatesModel: ReelsStatesModel = ReelsStatesModel.getInstance();
    private reelsViewModel: ReelsViewModel = ReelsViewModel.getInstance();
    private reelsUtil: ReelsUtil = ReelsUtil.getInstance();

    private tiles: TileView[] = [];

    private result: number[];

    private stoppingPromises: Promise<void>[] = [];
    private stoppingResolves: Function[] = [];
    private stoppingForcePromise: Promise<void>;
    private stoppingForceResolve: Function;

    private stopSpinning: boolean;

    private spinDirection: SpinDirection = SpinDirection.Down;
    private highestTilePositionY: number;
    private moveToPointY: number;

    public reelId: number;
    public finalStoppingTweenActive: boolean;

    private getNextPointY(): number {
        return this.moveToPointY * this.getDirectionModifier();
    }

    private getHighestTilePositionY(): number {
        return this.highestTilePositionY;
    }

    private getLowestTilePositionY(): number {
        return -this.highestTilePositionY * this.getDirectionModifier();
    }

    private getDirectionModifier(): number {
        return this.spinDirection === SpinDirection.Down ? 1 : -1;
    }

    public buildReel(): void {
        const singleReelModel: SingleReelModel = new SingleReelModel();

        const countTiles: number = ReelsConstants.COUNT_LINES + 2 * ReelsConstants.EXTRA_LINES;
        const startPositionY: number = ((ReelsConstants.TILE_HEIGHT + ReelsConstants.TILE_GAP) * (countTiles - 1)) / -2;
        for (let i: number = 0; i < countTiles; i++) {
            const tile: TileView = new TileView();
            tile.y = startPositionY + (ReelsConstants.TILE_HEIGHT + ReelsConstants.TILE_GAP) * i;
            this.addChild(tile);
            this.tiles.push(tile);
            singleReelModel.addTile(tile);
        }
        this.reelsViewModel.singleReelModels.push(singleReelModel);
    }

    public initReel(reelView: number[]): void {
        this.highestTilePositionY = this.tiles[this.tiles.length - 1].y;
        this.moveToPointY = ReelsConstants.TILE_HEIGHT + ReelsConstants.TILE_GAP;
        this.tiles.forEach((tile: TileView, i: number) => {
            tile.setTile(reelView[i]);
        });
    }

    public readyStop(): Promise<void> {
        this.result = this.reelsUtil.getReelStopSymbols(this.reelId);
        this.stopSpinning = true;
        return new Promise(resolve => {
            Promise.all(this.stoppingPromises).then(() => resolve());
        });
    }

    public async doSpin(): Promise<void> {
        this.reelsUtil.updateReelSetPosition(this.reelId, this.getDirectionModifier());
        this.stoppingResolves.forEach((resolve: Function) => resolve());

        this.stoppingPromises = [];
        this.stoppingPromises = [];
        this.stoppingResolves = [];
        this.stopSpinning = false;
        this.finalStoppingTweenActive = false;

        const promises: Promise<void>[] = [];
        for (let i: number = 0; i < this.tiles.length; i++) {
            this.stoppingPromises.push(new Promise(resolve => {
                this.stoppingResolves.push(resolve);
            }));
            promises.push(this.startReelSpin(this.tiles[i]));
        }
        await Promise.all(promises);
    }

    private startReelSpin(tile: TileView): Promise<void> {
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.STARTING, this.reelId);

        return new Promise(resolve => {
            Tween.to(tile, ReelsConstants.speed.STARTING_DURATION, {
                y: tile.y + this.getNextPointY(),
                ease: Back.easeIn.config(3)
            }).then(() => {
                this.changeSpinningCallback(tile);
                this.doSpinning(tile)
                    .then(() => resolve());
            });
        });
    }

    private async doSpinning(tile: TileView): Promise<void> {
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.SPINNING, this.reelId);
        await Tween.to(tile, ReelsConstants.speed.SPINNING_DURATION, {
            y: tile.y + this.getNextPointY(),
            ease: Power0.easeNone
        });
        this.changeSpinningCallback(tile);
        this.checkEndSpinningCallback(tile);
        return Promise.resolve();
    }

    private changeSpinningCallback(tile: TileView): void {
        if (tile.y * this.getDirectionModifier() > this.getHighestTilePositionY()) {
            tile.y = this.getLowestTilePositionY();
            this.updateBlur(true);
            tile.setTile(this.getNextTile());
        }
    }

    private checkEndSpinningCallback(tile: TileView): void {
        if (this.stopSpinning) {
            this.doStopping(tile);
        } else {
            this.doSpinning(tile);
        }
    }

    private async doStopping(tile: TileView): Promise<void> {
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.STOPPING, this.reelId);

        for (let i: number = 0; i < this.tiles.length; i++) {
            await Tween.to(tile, ReelsConstants.speed.STOPPING_DURATION, {
                y: tile.y + this.getNextPointY(),
            });
            this.changeStoppingCallback(tile);
        }
        this.updateBlur(false);
        await this.doStop(tile);
        return Promise.resolve();
    }

    private changeStoppingCallback(tile: TileView): void {
        if (tile.stoppingTileResolve) {
            return;
        }
        if (tile.y * this.getDirectionModifier() > this.getHighestTilePositionY()) {
            tile.y = this.getLowestTilePositionY();
            let symbolId: number = null;
            if (this.result && this.result.length) {
                symbolId = this.result.pop();
            }
            if (symbolId === null) {
                tile.setTile(this.getNextTile());
            } else {
                const stoppingResolve: Function = this.stoppingResolves.pop();
                tile.stoppingTileResolve = stoppingResolve;
                this.stoppingResolves.unshift(stoppingResolve);
                tile.setTile(symbolId);
            }
        }
    }

    private async doStop(tile: TileView): Promise<void> {
        this.finalStoppingTweenActive = true;
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.LANDING, this.reelId);

        const shiftY: number = this.getNextPointY() * ReelsConstants.speed.ROLLING_OUT_PERCENT;
        await Tween.to(tile, ReelsConstants.speed.FINAL_PRE_BOUNCE_TILE_DURATION, {
            y: tile.y + shiftY
        });
        await Tween.to(tile, this.getFinalBounceTileDuration(), {
            y: tile.y - shiftY,
            ease: Elastic.easeOut.config(1, 0.35)
        });
        this.finishDoStop(tile);
        return Promise.resolve();
    }

    private finishDoStop(tile: TileView): void {
        if (tile.stoppingTileResolve) {
            tile.stoppingTileResolve();
            tile.stoppingTileResolve = null;
        }
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.STOPPED, this.reelId);
    }

    private getFinalBounceTileDuration(): number {
        return ReelsConstants.speed.FINAL_BOUNCE_TILE_DURATION;
    }

    private getForceFinalBounceTileDuration(): number {
        return ReelsConstants.speed.FORCE_FINAL_BOUNCE_TILE_DURATION;
    }

    private getNextTile(): number {
        return this.reelsUtil.getNextTile(this.reelId, this.getDirectionModifier());
    }

    private updateBlur(isBlur: boolean): void {
        this.tiles.forEach((tile: TileView) => tile.toggleBlur(isBlur));
    }

    /**
     *  FORCE STOP LOGIC
     */
    public async readyForceStop(): Promise<void> {
        if (this.reelsStatesModel.getSingleReelState(this.reelId) === ReelsStatesEnum.STOPPED) {
            return Promise.resolve();
        }
        this.result = this.reelsUtil.getReelStopSymbols(this.reelId);
        this.stoppingForcePromise = new Promise(resolve => {
            this.stoppingForceResolve = resolve;
        });
        this.stoppingResolves.forEach(stoppingResolve => {
            stoppingResolve();
            stoppingResolve = null;
        });
        this.tiles.forEach((tile: TileView) => {
            TweenMax.killTweensOf(tile);
            if (tile.stoppingTileResolve) {
                tile.stoppingTileResolve();
                tile.stoppingTileResolve = null;
            }
        });
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.STOPPING, this.reelId);
        this.updateBlur(false);

        return this.changeForceStoppingForTile();
    }

    private changeForceStoppingForTile(): Promise<void> {
        const forceStopPromises: Promise<void>[] = [];

        const tiles: TileView[] = this.reelsViewModel.singleReelModels[this.reelId].getTiles();

        this.result.forEach((symbolId: number, index: number) => {
            const tile: TileView = tiles[index];
            tile.setTile(symbolId);
            tile.y = this.getTilePositionYByLineIndex(index);
            forceStopPromises.push(this.doForceStop(tile));
        });

        return Promise.all(forceStopPromises)
            .then(() => this.finishDoForceStop());
    }

    private getTilePositionYByLineIndex(index: number): number {
        const startPositionY: number = this.spinDirection === SpinDirection.Down
            ? this.getLowestTilePositionY()
            : this.getHighestTilePositionY();
        return (ReelsConstants.TILE_HEIGHT + ReelsConstants.TILE_GAP) * index * this.getDirectionModifier() + startPositionY;
    }

    private async doForceStop(tile: TileView): Promise<void> {
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.LANDING, this.reelId);
        const shiftY: number = this.getNextPointY() * ReelsConstants.speed.FORCE_ROLLING_OUT_PERCENT;
        await Tween.to(tile, this.getFinalBounceTileDuration() * 0.25, {
            y: tile.y + shiftY
        });
        await Tween.to(tile, this.getForceFinalBounceTileDuration() * 0.25, {
            y: tile.y - shiftY,
        });
        return Promise.resolve();
    }

    private finishDoForceStop(): void {
        this.stoppingForcePromise = null;
        this.stoppingPromises = [];
        this.result = null;
        this.reelsStatesModel.setSingleReelState(ReelsStatesEnum.STOPPED, this.reelId);
        this.stopSpinning = false;
        if (this.stoppingForceResolve) {
            this.stoppingForceResolve();
            this.stoppingForceResolve = null;
        }
    }
}