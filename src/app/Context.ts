import {AppConstants} from "./AppConstants";
import {Application} from "../export";
import {GameFlowManager} from "../gameFlow/managers/GameFlowManager";
import {ServerConnector} from "../server/controllers/ServerConnector";
import {WinModel} from "../winnings/models/WinModel";
import {MainGameSceneMediator} from "../scene/mediators/MainGameSceneMediator";
import {MainGameSceneView} from "../scene/views/MainGameSceneView";
import {GameLoadingManager} from "../gameLoading/managers/GameLoadingManager";
import {BalanceModel} from "../ui/models/BalanceModel";
import {BetModel} from "../ui/models/BetModel";

export class Context {

    private app: Application;

    public async start(): Promise<void> {
        this.createApplication();
        this.createScene();

        await this.startLoadingGame();

        this.resize();
        this.startGame();
    }

    private createApplication(): void {
        this.app = new Application({
            width: AppConstants.width,
            height: AppConstants.height,
            resolution: window.devicePixelRatio
        });
        document
            .getElementById("pixi-canvas")
            .appendChild(this.app.view);

        this.app.ticker.add(this.update.bind(this));
        window.onresize = () => this.resize();
    }

    private createScene(): void {
        const mainSceneView: MainGameSceneView = new MainGameSceneView();
        this.app.stage.addChild(mainSceneView);
        new MainGameSceneMediator().setView(mainSceneView);
    }

    private async startLoadingGame(): Promise<void> {
        new ServerConnector();
        BetModel.getInstance();
        BalanceModel.getInstance();

        await new GameLoadingManager().startLoadingGame();
    }

    private startGame(): void {
        WinModel.getInstance();

        new GameFlowManager().startGame();
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
