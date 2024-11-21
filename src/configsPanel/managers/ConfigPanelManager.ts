import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {ConfigPanelModel} from "../models/ConfigPanelModel";
import {IConfigSection} from "../interfaces/IConfigSection";
import {GameFlowIntents} from "../../gameFlow/events/GameFlowIntents";

export class ConfigPanelManager extends GlobalEventProvider {
    private configPanelModel: ConfigPanelModel = ConfigPanelModel.getInstance();

    private sections: IConfigSection[] = [];

    public init(): ConfigPanelManager {
        this.addListenerOnce(GameFlowIntents.INITIALIZE_GAME_DATA, this.onInitializeGameData);
        return this;
    }

    public addSection(section: IConfigSection): ConfigPanelManager {
        this.sections.push(section);
        return this;
    }

    private onInitializeGameData(): void {
        const panelButton: HTMLDivElement = document.createElement("div");
        panelButton.style.position = "fixed";
        panelButton.style.top = "10px";
        panelButton.style.right = "10px";
        panelButton.style.width = panelButton.style.height = "1.5em";
        panelButton.style.borderRadius = "50%";
        panelButton.style.border = "solid white 0.2em";
        panelButton.style.backgroundColor = "rgb(1, 163, 250)";
        document.body.appendChild(panelButton);

        panelButton.addEventListener("click", () => this.addReelsConfigPanel());
    }

    private addReelsConfigPanel(): void {
        if (this.configPanelModel.guiCreated()) {
            this.configPanelModel.destroyGui();
            return;
        }
        this.sections.forEach((section: IConfigSection) => section.createController());
    }
}