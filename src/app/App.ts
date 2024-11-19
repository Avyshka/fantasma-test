import {LoadManager} from "./managers/LoadManager";
import {AppConstants} from "./AppConstants";
import {Application, Graphics} from "../export";
import {SpinButtonView} from "../ui/views/SpinButtonView";
import {SpinButtonMediator} from "../ui/mediators/SpinButtonMediator";
import {GameFlowManager} from "../gameFlow/managers/GameFlowManager";
import {ServerConnector} from "../server/controllers/ServerConnector";
import {WinModel} from "../winnings/models/WinModel";
import {AmountBarView} from "../ui/views/AmountBarView";
import {BalanceAmountBarMediator} from "../ui/mediators/BalanceAmountBarMediator";
import {BetAmountBarMediator} from "../ui/mediators/BetAmountBarMediator";

export class App {

    private app: Application;

    constructor() {
        this.createApplication();

        window.onresize = () => this.resize();

        new LoadManager()
            .loadAssets()
            .then(() => {
                this.createScene();
                this.app.ticker.add(this.update.bind(this));
                this.resize();

                new ServerConnector();
                WinModel.getInstance();
                new GameFlowManager().startGame();
            });
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
    }

    private createScene(): void {
        const g: Graphics = new Graphics();
        g.beginFill(0xFFFFFF, 0.1);
        g.drawRect(0, 0, AppConstants.width, AppConstants.height);
        this.app.stage.addChild(g);

        // todo: move to BottomBarView
        const spinButtonView: SpinButtonView = new SpinButtonView();
        spinButtonView.x = AppConstants.width * 0.5;
        spinButtonView.y = AppConstants.height - spinButtonView.height * 0.5;
        this.app.stage.addChild(spinButtonView);

        new SpinButtonMediator().setView(spinButtonView);

        const balanceAmountBarView: AmountBarView = new AmountBarView("balance");
        balanceAmountBarView.x = spinButtonView.x + 240;
        balanceAmountBarView.y = spinButtonView.y;
        this.app.stage.addChild(balanceAmountBarView);

        new BalanceAmountBarMediator().setView(balanceAmountBarView);

        const betAmountBarView: AmountBarView = new AmountBarView("bet");
        betAmountBarView.x = spinButtonView.x - 240;
        betAmountBarView.y = spinButtonView.y;
        this.app.stage.addChild(betAmountBarView);

        new BetAmountBarMediator().setView(betAmountBarView);
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
