import {IConfigSection} from "../interfaces/IConfigSection";
import {GUI} from "dat.gui";
import {ConfigPanelModel} from "../models/ConfigPanelModel";
import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {ServerEvents} from "../../server/events/ServerEvents";

export class GameConfigSection extends GlobalEventProvider implements IConfigSection {

    private configPanelModel: ConfigPanelModel = ConfigPanelModel.getInstance();

    private balance: number = 100;

    public createController(): GUI {
        const folder: GUI = this.configPanelModel.getGui().addFolder("Game");

        folder
            .add(this, "balance", 1, 100, 1)
            .name("Balance, please be careful")
            .listen()
            .onChange(() => this.onChangeBalance());

        return folder;
    }

    private onChangeBalance(): void {
        this.dispatch(ServerEvents.SEND_CHANGING_BALANCE_TO_SERVER_CONNECTOR, this.balance);
    }
}