import {AppConstants} from "./AppConstants";
import {Application} from "./export";
import {GameFlowManager} from "./gameFlow/managers/GameFlowManager";
import {ServerConnector} from "./server/controllers/ServerConnector";
import {WinModel} from "./winnings/models/WinModel";
import {MainGameSceneMediator} from "./scene/mediators/MainGameSceneMediator";
import {MainGameSceneView} from "./scene/views/MainGameSceneView";
import {GameLoadingManager} from "./gameLoading/managers/GameLoadingManager";
import {BalanceModel} from "./ui/models/BalanceModel";
import {BetModel} from "./ui/models/BetModel";
import {ReelsModel} from "./reels/models/ReelsModel";
import {ConfigPanelManager} from "./configsPanel/managers/ConfigPanelManager";
import {ReelsConfigSection} from "./configsPanel/sections/ReelsConfigSection";
import {WinBoxConfigSection} from "./configsPanel/sections/WinBoxConfigSection";
import {GameConfigSection} from "./configsPanel/sections/GameConfigSection";

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
        ReelsModel.getInstance();

        await new GameLoadingManager().startLoadingGame();
    }

    private startGame(): void {
        WinModel.getInstance();

        if (__DEV__) {
            new ConfigPanelManager()
                .init()
                .addSection(new ReelsConfigSection())
                .addSection(new WinBoxConfigSection())
                .addSection(new GameConfigSection());
        }

        new GameFlowManager().startGame();
    }

    private resize(): void {
        const scaleX: number = window.innerWidth / AppConstants.width;
        const scaleY: number = window.innerHeight / AppConstants.height;

        const isLandscape: boolean = scaleX > scaleY;

        this.app.renderer.resize(AppConstants.width * scaleX, AppConstants.height * scaleY);
        const scale: number = Math.min(scaleX, scaleY);
        this.app.stage.scale.set(scale);
        this.app.stage.x = isLandscape ? (window.innerWidth - AppConstants.width * scale) * 0.5 : 0;
        this.app.stage.y = isLandscape ? 0 : (window.innerHeight - AppConstants.height * scale) * 0.5;
    }
}
