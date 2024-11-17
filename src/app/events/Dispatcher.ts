import {EventEmitter} from "../../export";
import {ListenerFn} from "../types/ListenerFn";

export class Dispatcher extends EventEmitter {
    private static instance: Dispatcher;

    private constructor() {
        super();
    }

    public static getInstance(): Dispatcher {
        if (!Dispatcher.instance) {
            Dispatcher.instance = new Dispatcher();
        }
        return Dispatcher.instance;
    }

    public dispatch(eventName: string, data?: any): void {
        this.emit(eventName, data);
    }

    public addListenerOnce(eventName: string, fn: ListenerFn, context: any = this): void {
        this.once(eventName, fn, context);
    }
}
