import {IActionInfo} from "./IActionInfo";

export interface IAction {
    run(actionInfo: IActionInfo): Promise<IActionInfo>;

    terminate(): Promise<IActionInfo>;

    onExecute(actionInfo: IActionInfo): Promise<IActionInfo>;

    onTerminate(actionInfo: IActionInfo): Promise<IActionInfo>;
}