import {LoadManager} from "../managers/LoadManager";
import {AppConstants} from "./AppConstants";

export class App {

    private app: PIXI.Application;

    constructor() {
        this.createApplication();

        window.onresize = () => this.resize();

        new LoadManager()
            .loadAssets()
            .then(() => {
                this.createScene();
                this.app.ticker.add(this.update.bind(this));
                this.resize();
            });
    }

    private createApplication(): void {
        this.app = new PIXI.Application({
            width: AppConstants.width,
            height: AppConstants.height,
            resolution: window.devicePixelRatio
        });
        document
            .getElementById("pixi-canvas")
            .appendChild(this.app.view);
    }

    private createScene(): void {
        const g: PIXI.Graphics = new PIXI.Graphics();
        g.beginFill(0xFFFFFF, 0.1);
        g.drawRect(0, 0, AppConstants.width, AppConstants.height);
        this.app.stage.addChild(g);

        const texture: PIXI.Texture = PIXI.Texture.from(AppConstants.images.PLAY_BUTTON_NORMAL);
        const sprite: PIXI.Sprite = new PIXI.Sprite(texture);
        sprite.x = AppConstants.width * 0.5;
        sprite.y = AppConstants.height - sprite.height * 0.5;
        sprite.anchor.set(0.5);
        this.app.stage.addChild(sprite);
    }

    private resize(): void {
        const scaleX: number = window.innerWidth / AppConstants.width;
        const scaleY: number = window.innerHeight / AppConstants.height;

        this.app.renderer.resize(AppConstants.width * scaleX, AppConstants.height * scaleY);
        this.app.stage.scale.set(Math.min(scaleX, scaleY));
        this.app.stage.y = (window.innerHeight - AppConstants.height * scaleX) * 0.5;
    }

    private update(deltaTime: number): void {

    }
}
