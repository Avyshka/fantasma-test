import {BaseView} from "../../app/views/BaseView";
import {Graphics, Text, TextStyle} from "../../export";
import {UIConstants} from "../UIConstants";

export class AmountBarView extends BaseView {

    private titleLabel: Text;
    private amountLabel: Text;

    constructor(title: string) {
        super();
        this.addBackground();
        this.addTitle(title);
        this.addAmount();
    }

    public updateAmount(value: string): void {
        this.amountLabel.text = value;
    }

    private addBackground(): void {
        const backWidth: number = 180;
        const backHeight: number = (this.getTitleFontSize() + this.getAmountFontSize()) * 1.8;
        const backRadius: number = 12;

        const background: Graphics = new Graphics();
        background.beginFill(0x000000, 0.5);
        background.drawRoundedRect(
            -backWidth / 2,
            -backHeight / 2,
            backWidth,
            backHeight,
            backRadius
        );
        this.addChild(background);
    }

    private addTitle(title: string): void {
        this.titleLabel = new Text(title.toUpperCase(), new TextStyle(UIConstants.textStyles.title));
        this.titleLabel.y = -this.getPositionY();
        this.titleLabel.anchor.set(0.5);
        this.addChild(this.titleLabel);
    }

    private addAmount(): void {
        this.amountLabel = new Text("", new TextStyle(UIConstants.textStyles.amount));
        this.amountLabel.y = this.getPositionY();
        this.amountLabel.anchor.set(0.5);
        this.addChild(this.amountLabel);
    }

    private getPositionY(): number {
        return (this.getTitleFontSize() * 0.7 + this.getAmountFontSize() * 0.7) * 0.5;
    }

    private getTitleFontSize(): number {
        return +UIConstants.textStyles.title.fontSize;
    }

    private getAmountFontSize(): number {
        return +UIConstants.textStyles.amount.fontSize;
    }
}