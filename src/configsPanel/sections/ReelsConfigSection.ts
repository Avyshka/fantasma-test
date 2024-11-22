import {IConfigSection} from "../interfaces/IConfigSection";
import {GUI} from "dat.gui";
import {ConfigPanelModel} from "../models/ConfigPanelModel";
import {ReelsConstants} from "../../reels/ReelsConstants";

export class ReelsConfigSection implements IConfigSection {

    private configPanelModel: ConfigPanelModel = ConfigPanelModel.getInstance();

    public createController(): GUI {
        const folder: GUI = this.configPanelModel.getGui().addFolder("Reels speed");

        folder
            .add(ReelsConstants.speed, "STARTING_DURATION", 0.001, 2, 0.001)
            .name("Starting duration, [sec]");
        folder
            .add(ReelsConstants.speed, "SPINNING_DURATION", 0.001, 2, 0.001)
            .name("Spinning duration, [sec]");
        folder
            .add(ReelsConstants.speed, "STOPPING_DURATION", 0.001, 2, 0.001)
            .name("Stopping duration, [sec]");

        folder
            .add(ReelsConstants.speed, "FINAL_PRE_BOUNCE_TILE_DURATION", 0.001, 0.01, 0.0001)
            .name("Final pre bounce tile duration, [sec]");
        folder
            .add(ReelsConstants.speed, "FINAL_BOUNCE_TILE_DURATION", 0.001, 1, 0.001)
            .name("Final bounce tile duration, [sec]");
        folder
            .add(ReelsConstants.speed, "FORCE_FINAL_BOUNCE_TILE_DURATION", 0.001, 1, 0.001)
            .name("Force final bounce tile duration, [sec]");

        folder
            .add(ReelsConstants.speed, "ROLLING_OUT_PERCENT", 0, 1, 0.01)
            .name("Rolling out, [%]");
        folder
            .add(ReelsConstants.speed, "FORCE_ROLLING_OUT_PERCENT", 0, 1, 0.01)
            .name("Force rolling out, [%]");

        folder
            .add(ReelsConstants, "MIN_SPIN_DURATION", 0, 5000, 1)
            .name("Min spin duration, [ms]");
        folder
            .add(ReelsConstants, "PER_REEL_STOPPING_DELAY", 0, 2000, 1)
            .name("Per reel stopping delay, [ms]");

        return folder;
    }
}