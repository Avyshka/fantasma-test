import {GlobalEventProvider} from "../../app/events/GlobalEventProvider";
import {WinBoxEvents} from "../events/WinBoxEvents";

export class WinBoxModel extends GlobalEventProvider {

    private static instance: WinBoxModel;

    private _currentAmount: number;

    private constructor() {
        super();
    }

    public static getInstance(): WinBoxModel {
        if (!WinBoxModel.instance) {
            WinBoxModel.instance = new WinBoxModel();
        }
        return WinBoxModel.instance;
    }

    public set currentAmount(value: number) {
        this._currentAmount = value;
        this.dispatch(WinBoxEvents.VALUE_CHANGED, this._currentAmount);
    }
}