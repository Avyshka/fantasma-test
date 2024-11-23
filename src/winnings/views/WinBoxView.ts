import {LayoutView} from "../../app/views/LayoutView";
import {Sprite, Text, TextStyle, Texture} from "../../export";
import {AppConstants} from "../../AppConstants";
import {WinBoxConstants} from "../WinBoxConstants";
import {Back, TweenMax} from "gsap";

export class WinBoxView extends LayoutView {

    private amountLabel: Text;

    protected create(): void {
        this.createBackground();
        this.createTicker();

        this.x = AppConstants.width * 0.5;
        this.y = (AppConstants.height - AppConstants.bottomBarHeight) * 0.5;

        this.scale.set(0);
        this.alpha = 0;
    }

    private createBackground(): void {
        const background: Sprite = new Sprite(Texture.from(AppConstants.images.WIN_BACKGROUND));
        background.anchor.set(0.5);
        background.scale.x = 3.4;
        background.scale.y = 1;
        this.addChild(background);
    }

    private createTicker(): void {
        this.amountLabel = new Text("", new TextStyle(WinBoxConstants.textStyle));
        this.amountLabel.anchor.set(0.5);
        this.addChild(this.amountLabel);
    }

    public updateAmount(value: string): void {
        this.amountLabel.text = value;
    }

    public show(): void {
        this.changeVisibility(true);
    }

    public hide(): void {
        this.changeVisibility(false);
    }

    private changeVisibility(visibility: boolean): void {
        TweenMax.killTweensOf(this);
        TweenMax.to(this, WinBoxConstants.CHANGE_VISIBILITY_DURATION, {
            alpha: visibility ? 1 : 0
        });
        TweenMax.to(this.scale, WinBoxConstants.CHANGE_VISIBILITY_DURATION, {
            x: visibility ? 1 : 0,
            y: visibility ? 1 : 0,
            ease: visibility ? Back.easeOut : Back.easeIn
        });
    }
}