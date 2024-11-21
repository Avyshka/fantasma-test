import {GUI} from "dat.gui";

export class ConfigPanelModel {
    private gui: GUI;

    private static instance: ConfigPanelModel;

    private constructor() {
    }

    public static getInstance(): ConfigPanelModel {
        if (!ConfigPanelModel.instance) {
            ConfigPanelModel.instance = new ConfigPanelModel();
        }
        return ConfigPanelModel.instance;
    }

    public guiCreated(): boolean {
        return !!this.gui;
    }

    public getGui(): GUI {
        if (!this.guiCreated()) {
            this.gui = new GUI({width: 500, closed: false});
            this.gui.domElement.parentElement.style.zIndex = "100";
        }
        return this.gui;
    }

    public destroyGui(): void {
        if (this.guiCreated()) {
            this.gui.destroy();
            this.gui = null;
        }
    }
}