import {BaseView} from "../../app/views/BaseView";
import {Sprite, Texture} from "../../export";
import {AppConstants} from "../../AppConstants";
import {StringUtils} from "../../app/utils/StringUtils";
import {TweenMax} from "gsap";
import {ReelsConstants} from "../ReelsConstants";

export class TileView extends BaseView {
    private renderSprite: Sprite;

    private symbolId: number;
    private isBlur: boolean;

    public stoppingTileResolve: Function;

    constructor() {
        super();
        this.renderSprite = new Sprite();
        this.renderSprite.anchor.set(0.5);
        this.renderSprite.x = ReelsConstants.TILE_WIDTH * 0.5;
        this.renderSprite.y = ReelsConstants.TILE_HEIGHT * 0.5;
        this.addChild(this.renderSprite);

        this.pivot.y = ReelsConstants.TILE_HEIGHT * 0.5;
    }

    public setTile(symbolId: number): void {
        this.symbolId = symbolId;
        this.renderSprite.texture = this.getTexture();
    }

    public toggleBlur(isBlur: boolean): void {
        this.isBlur = isBlur;
        // todo: add blur filter?
    }

    public playAnimation(): Promise<void> {
        return Promise.resolve();
    }

    public stopAnimation(): void {
        TweenMax.killTweensOf(this);
        this.scale.set(1);
    }

    private getTexture(): Texture {
        return Texture.from(StringUtils.substitute(
            AppConstants.images.SYMBOL_PATTERN,
            {
                id: this.symbolId
            }
        ));
    }
}