import {Circle, Sprite, Texture} from "../../export";
import {AppConstants} from "../../AppConstants";
import {UIConstants} from "../UIConstants";
import {BaseView} from "../../app/views/BaseView";
import {SpinButtonViewEvents} from "../events/SpinButtonViewEvents";

export class SpinButtonView extends BaseView {

    private renderSprite: Sprite;

    private isPressed: boolean;
    private isHovered: boolean;

    constructor() {
        super();
        this.createButton();
        this.addListeners();
    }

    private createButton(): void {
        this.renderSprite = new Sprite(this.getNormalTexture());
        this.renderSprite.anchor.set(0.5);
        this.renderSprite.interactive = true;
        this.renderSprite.buttonMode = true;
        this.addChild(this.renderSprite);

        this.renderSprite.hitArea = new Circle(
            this.renderSprite.x,
            this.renderSprite.y,
            this.renderSprite.width * 0.5
        );
    }

    private addListeners(): void {
        this.renderSprite
            .on("pointerdown", this.onButtonDown, this)
            .on("pointerup", this.onButtonUp, this)
            .on("pointerover", this.onButtonOver, this)
            .on("pointerout", this.onButtonOut, this);
    }

    public changeInteractivity(value: boolean): void {
        this.renderSprite.interactive = value;
        this.renderSprite.texture = value
            ? this.getNormalTexture()
            : this.getDisabledTexture();
        this.renderSprite.scale.set(
            value && this.isHovered
                ? UIConstants.spinButton.scaleHovered
                : UIConstants.spinButton.scaleNormal
        );
    }

    private onButtonDown(): void {
        this.isPressed = true;
        this.renderSprite.scale.set(UIConstants.spinButton.scalePressed);
        this.alpha = 1;
    }

    private onButtonUp(): void {
        this.isPressed = false;
        this.renderSprite.scale.set(
            this.isHovered
                ? UIConstants.spinButton.scaleHovered
                : UIConstants.spinButton.scaleNormal
        );
        this.emit(SpinButtonViewEvents.SPIN_BUTTON_CLICKED);
    }

    private onButtonOver(): void {
        this.isHovered = true;
        if (this.isPressed) {
            return;
        }
        this.renderSprite.scale.set(UIConstants.spinButton.scaleHovered);
    }

    private onButtonOut(): void {
        this.isHovered = false;
        this.isPressed = false;
        this.renderSprite.scale.set(UIConstants.spinButton.scaleNormal);
    }

    private getNormalTexture(): Texture {
        return Texture.from(AppConstants.images.PLAY_BUTTON_NORMAL);
    }

    private getDisabledTexture(): Texture {
        return Texture.from(AppConstants.images.PLAY_BUTTON_DISABLE);
    }
}