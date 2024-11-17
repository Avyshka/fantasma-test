import {GlobalEventProvider} from "../events/GlobalEventProvider";
import {IAction} from "./interfaces/IAction";
import {IActionInfo} from "./interfaces/IActionInfo";

export class Action extends GlobalEventProvider implements IAction {
    private lastActionInfo: IActionInfo;
    private promiseReject: any = null;
    private actionInfoReadyToPrepare: boolean = true;

    protected isTerminated: boolean;
    private isResolved: boolean;

    protected isTerminable(): boolean {
        return true;
    }

    private releaseActionInfoInternal(actionInfo: IActionInfo): IActionInfo {
        if (!this.actionInfoReadyToPrepare) {
            this.actionInfoReadyToPrepare = true;
            return this.releaseActionInfo(actionInfo);
        }
        return actionInfo;
    }

    private prepareActionInfoInternal(actionInfo: IActionInfo): IActionInfo {
        if (this.actionInfoReadyToPrepare) {
            this.actionInfoReadyToPrepare = false;
            return this.prepareActionInfo(actionInfo);
        }
        return actionInfo;
    }

    public run(actionInfo: IActionInfo): Promise<IActionInfo> {
        actionInfo.lastActionName = this.getActionName();
        this.lastActionInfo = actionInfo;
        this.isTerminated = false;
        this.promiseReject = null;
        this.isResolved = false;

        return new Promise<IActionInfo>((resolve, reject) => {
            this.debugLog(actionInfo);

            // create an internal function to prevent to copy-paste code
            const internalResolve = (actionInfo: IActionInfo) => {
                resolve(this.releaseActionInfoInternal(actionInfo));
            };

            if (this.guard(actionInfo)) {
                const tempPromise = this.onExecute(this.prepareActionInfoInternal(actionInfo));
                tempPromise.then((actionInfo) => {
                    this.isResolved = true;
                    internalResolve(actionInfo);
                });
                this.promiseReject = reject;
            } else {
                internalResolve(actionInfo);
            }
        });
    }

    protected guard(actionInfo: IActionInfo): boolean {
        return true;
    }

    protected prepareActionInfo(actionInfo: IActionInfo): IActionInfo {
        return actionInfo;
    }

    protected releaseActionInfo(actionInfo: IActionInfo): IActionInfo {
        return actionInfo;
    }

    public onExecute(actionInfo: IActionInfo): Promise<IActionInfo> {
        return Promise.resolve(actionInfo);
    }

    public onTerminate(actionInfo: IActionInfo): Promise<IActionInfo> {
        return Promise.resolve(actionInfo);
    }

    public terminate(): Promise<IActionInfo> {
        this.lastActionInfo.isTerminating = true;

        if (!this.isTerminated && !this.isResolved) {
            this.isTerminated = true;
            this.lastActionInfo = this.releaseActionInfoInternal(this.lastActionInfo);

            if (this.promiseReject && this.isTerminable()) {
                this.promiseReject(this.lastActionInfo);
                return this.onTerminate(this.lastActionInfo);
            }
        }
        return null;
    }

    private getActionName(): string {
        return this.constructor.name;
    }

    private debugLog(actionInfo): void {
        if (__DEV__) {
            const guard: boolean = this.guard(actionInfo);
            const data: string = this.getLogData(actionInfo);
            const fontColorTitle: string = this.getFontColorTitle(guard);
            const fontColorData: string = this.getFontColorData(guard);
            const backColorTitle: string = this.getBackColorTitle(guard);
            const backColorData: string = this.getBackColorData(guard);
            console.log(
                `%c${this.getActionName()} %c${data} / ${guard ? "[+]" : "[-]"}`,
                `font-size: 0.9em; color: ${fontColorTitle}; background-color: ${backColorTitle}; padding: 2px 10px; border-radius: 2px 0 0 2px`,
                `font-size: 0.9em; color: ${fontColorData}; background-color: ${backColorData}; padding: 2px 10px; border-radius: 0 2px 2px 0`,
            );
        }
    }

    private getFontColorTitle(guard: boolean): string {
        const colorActive: string = "#ffffff";
        const colorInactive: string = "#a2a2a2";
        return guard ? colorActive : colorInactive;
    }

    private getFontColorData(guard: boolean): string {
        const colorActive: string = "#000000";
        const colorInactive: string = "#525252";
        return guard ? colorActive : colorInactive;
    }

    private getBackColorTitle(guard: boolean): string {
        const colorActive: string = "#d55b9c";
        const colorInactive: string = "#5e2945";
        return guard ? colorActive : colorInactive;
    }

    private getBackColorData(guard: boolean): string {
        const colorActive: string = "#ececec";
        const colorInactive: string = "#000000";
        return guard ? colorActive : colorInactive;
    }

    private getLogData(actionInfo: IActionInfo): string {
        let data: string = "";
        for (const key in actionInfo) {
            if (key === "lastActionName" && actionInfo[key] === this.getActionName()) {
                continue;
            }
            if (data.length > 0) {
                data += ", ";
            }
            data += `${key}: ${actionInfo[key]}`;
        }
        return data;
    }
}