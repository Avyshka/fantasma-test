import {IConfigSection} from "../interfaces/IConfigSection";
import {GUI} from "dat.gui";
import {ConfigPanelModel} from "../models/ConfigPanelModel";
import {WinBoxConstants} from "../../winnings/WinBoxConstants";

export class WinBoxConfigSection implements IConfigSection {

    private configPanelModel: ConfigPanelModel = ConfigPanelModel.getInstance();

    public createController(): GUI {
        const folder: GUI = this.configPanelModel.getGui().addFolder("Win box timings");

        folder
            .add(WinBoxConstants, "TICK_UP_TIME", 0.01, 5, 0.01)
            .name("Tick-up duration, [sec]");
        folder
            .add(WinBoxConstants, "DELAY_BEFORE_HIDE", 1, 3000, 1)
            .name("Delay before hide tick-up, [ms]");
        folder
            .add(WinBoxConstants, "DELAY_BEFORE_HIDE_IN_TERMINATE", 1, 3000, 1)
            .name("Delay before hide tick-up in terminate, [ms]");
        folder
            .add(WinBoxConstants, "CHANGE_VISIBILITY_DURATION", 0.05, 1, 0.01)
            .name("Change visibility duration, [sec]");

        return folder;
    }
}