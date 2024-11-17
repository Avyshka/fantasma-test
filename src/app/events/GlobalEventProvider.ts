import {IAssociativeArray} from "./interfaces/IAssociativeArray";
import {Dispatcher} from "./Dispatcher";
import {ListenerFn} from "../types/ListenerFn";

export class GlobalEventProvider {

    private listenersMap: IAssociativeArray<Array<ListenerFn>> = {};
    private dispatcher: Dispatcher = Dispatcher.getInstance();

    public destroy(): void {
        this.removeAllListeners();
    }

    public dispatch(eventName: string, data?: any): void {
        this.dispatcher.dispatch(eventName, data);
    }

    public addListener(eventName: string, fn: ListenerFn): void {
        if (this.mapListenerToEvent(eventName, fn, this.listenersMap)) {
            this.dispatcher.addListener(eventName, fn, this);
        } else {
            console.warn(`Listener ${fn} for event ${eventName} is already exists`);
        }
    }

    public addListenerOnce(eventName: string, fn: ListenerFn): void {
        if (this.mapListenerToEvent(eventName, fn, this.listenersMap)) {
            this.dispatcher.addListenerOnce(eventName, () => {
                this.unMapListenerToEvent(eventName, fn, this.listenersMap);
            });
            this.dispatcher.addListenerOnce(eventName, fn, this);
        } else {
            console.warn(`Listener ${fn} for event ${eventName} is already exists`);
        }
    }

    public removeListener(eventName: string, fn: ListenerFn): void {
        if (this.unMapListenerToEvent(eventName, fn, this.listenersMap)) {
            this.dispatcher.removeListener(eventName, fn, this);
        } else {
            console.warn(`${fn} is not a listener for event ${eventName}`);
        }
    }

    public removeListeners(eventName: string): void {
        const listenersForEvent: Array<ListenerFn> = this.listenersMap[eventName];
        if (listenersForEvent) {
            for (const fn of listenersForEvent) {
                this.dispatcher.removeListener(eventName, fn, this);
            }
            delete this.listenersMap[eventName];
        } else {
            console.warn(`There are no any listeners for event ${eventName}`);
        }
    }

    public removeAllListeners(): void {
        for (const key of Object.keys(this.listenersMap)) {
            this.removeListeners(key);
        }
        this.listenersMap = {};
    }

    public hasListeners(): boolean {
        return Object.keys(this.listenersMap).length !== 0;
    }

    protected mapListenerToEvent(eventName: string, fn: ListenerFn, map: IAssociativeArray<Array<ListenerFn>>): boolean {
        let listenersForEvent: Array<ListenerFn> = map[eventName];
        if (!listenersForEvent) {
            listenersForEvent = [fn];
            map[eventName] = listenersForEvent;
        } else {
            if (listenersForEvent.indexOf(fn) > -1) {
                return false;
            } else {
                listenersForEvent.push(fn);
            }
        }
        return true;
    }

    protected unMapListenerToEvent(eventName: string, fn: ListenerFn, map: IAssociativeArray<Array<ListenerFn>>): boolean {
        const listenersForEvent: Array<ListenerFn> = map[eventName];
        if (listenersForEvent) {
            const listenerIndex: number = listenersForEvent.indexOf(fn);
            if (listenerIndex > -1) {
                listenersForEvent.splice(listenerIndex, 1);
                if (listenersForEvent.length === 0) {
                    delete map[eventName];
                }
                return true;
            }
        }
        return false;
    }
}
