import {IAction} from "./interfaces/IAction";
import {IActionInfo} from "./interfaces/IActionInfo";
import {Dictionary} from "../utils/Dictionary";

export class ActionManager {
    private actionsMap: ActionsLinkedDictionary = new ActionsLinkedDictionary();
    private currentActionStatus: IActionStatus;

    public onStart: (actionInfo: IActionInfo) => void;
    public onChange: (actionInfo: IActionInfo) => void;
    public onError: (actionInfo: IActionInfo) => void = (actionInfo: IActionInfo) => console.error("Error in action " + actionInfo);
    public onFinish: (actionInfo: IActionInfo) => void = (actionInfo: IActionInfo) => actionInfo;

    private isAsyncStarted: boolean = false;

    public addAction(action: IAction): ActionManager {
        this.actionsMap.add(action);
        return this;
    }

    public startAsync(actionInfo: IActionInfo): Promise<IActionInfo> {
        if (this.isAsyncStarted) {
            throw new Error("the ActionManager startAsync is not finished yet.");
        }
        this.isAsyncStarted = true;

        const onFinishOriginal = this.onFinish;

        return new Promise<IActionInfo>(resolve => {
            this.onFinish = (actionInfo: IActionInfo) => {
                resolve(actionInfo);
                this.isAsyncStarted = false;
                onFinishOriginal(actionInfo);
                this.onFinish = onFinishOriginal;
            };
            this.start(actionInfo);
        });
    }

    public start(actionInfo: IActionInfo): void {
        if (!this.actionsMap.isEmpty()) {
            if (this.onStart) {
                this.onStart(actionInfo);
            }
            this.currentActionStatus = this.actionsMap.getFirst();
            this.runNextAction(actionInfo);
        }
    }

    public terminate(): void {
        this.terminateAction();
    }

    private terminateAction(): void {
        if (!this.currentActionStatus) {
            return;
        }
        const status: IActionStatus = this.currentActionStatus;
        const action: IAction = status.action;

        if (!ActionManager.isActionCanTerminate(status)) {
            return;
        }

        status.isTerminating = true;
        const terminatePromise = action.terminate();
        if (terminatePromise) {
            terminatePromise.then((actionInfo: IActionInfo) => {
                status.isTerminated = true;
                this.tryToRunNextAction(status, actionInfo);
            });
        }
    }

    public getCurrentAction(): IAction {
        return this.currentActionStatus ? this.currentActionStatus.action : null;
    }

    private runNextAction(actionInfo: IActionInfo): void {
        if (!this.currentActionStatus) {
            return;
        }
        const status: IActionStatus = this.currentActionStatus;
        const action: IAction = status.action;

        if (!ActionManager.isActionCanRun(status)) {
            return;
        }
        status.isRunning = true;
        const tempPromise: Promise<any> = action.run(actionInfo);

        if (this.onChange) {
            this.onChange(actionInfo);
        }

        tempPromise.then(
            (actionInfo: IActionInfo) => {
                status.isResolved = true;
                this.tryToRunNextAction(status, actionInfo);
            },
            (actionInfo: IActionInfo) => {
                if (!actionInfo.isTerminating) {
                    throw actionInfo;
                }
            }
        );
    }

    private tryToRunNextAction(status: IActionStatus, actionInfo: IActionInfo): void {
        if (status.next) {
            this.currentActionStatus = status.next;
            this.runNextAction(actionInfo);
        } else {
            this.completed(actionInfo);
        }
    }

    private completed(actionInfo: IActionInfo): void {
        this.currentActionStatus = null;
        this.actionsMap.resetActions();
        if (this.onFinish) {
            this.onFinish(actionInfo);
        }
    }

    private static isActionCanTerminate(status: IActionStatus): boolean {
        return status.isRunning && !status.isResolved && !status.isTerminating && !status.isTerminated;
    }

    private static isActionCanRun(status: IActionStatus): boolean {
        return !status.isRunning && !status.isResolved && !status.isTerminating && !status.isTerminated;
    }
}

class ActionsLinkedDictionary {
    private defaultActionStatus: Object;
    private first: IActionStatus;
    private last: IActionStatus;
    private actions: Dictionary<IAction, IActionStatus>;

    constructor() {
        this.actions = new Dictionary<IAction, IActionStatus>();
        this.defaultActionStatus = {
            isRunning: false,
            isResolved: false,
            isTerminating: false,
            isTerminated: false,
        };
    }

    public resetActions(): void {
        this.actions.forEach((actionStatus: IActionStatus) => {
            (<any>Object).assign(actionStatus, this.defaultActionStatus);
        });
    }

    public add(action: IAction): void {
        const status: IActionStatus = {
            action: action,
            isRunning: false,
            isResolved: false,
            isTerminating: false,
            isTerminated: false,
        };
        this.actions.add(action, status);

        if (!this.first) {
            this.first = status;
            this.last = status;
        } else {
            this.last.next = status;
            this.last = status;
        }
    }

    public getFirst(): IActionStatus {
        return this.first;
    }

    public isEmpty(): boolean {
        return !this.first;
    }
}

interface IActionStatus {
    action: IAction;
    isRunning: boolean;
    isResolved: boolean;
    isTerminating: boolean;
    isTerminated: boolean;
    next?: IActionStatus;
}