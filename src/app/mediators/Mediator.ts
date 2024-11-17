import {ListenerFn} from "../types/ListenerFn";
import {GlobalEventProvider} from "../events/GlobalEventProvider";
import {IView} from "../views/interfaces/IView";
import {IMediator} from "./interfaces/IMediator";
import {IAssociativeArray} from "../events/interfaces/IAssociativeArray";

export abstract class Mediator extends GlobalEventProvider implements IMediator {
    protected view: IView;
    private viewListenersMap: IAssociativeArray<ListenerFn[]> = {};

    public destroy() {
        super.destroy();
        this.removeAllViewListeners();
    }

    protected addViewListener(eventName: string, fn: ListenerFn): void {
        if (!this.view) {
            throw new Error("View listener can't be added when view not initialized!!!");
        }
        if (this.mapListenerToEvent(eventName, fn, this.viewListenersMap)) {
            this.view.on(eventName, fn, this);
        } else {
            console.warn(`View listener ${fn} for event ${eventName} is already exists`);
        }
    }

    protected addViewListenerOnce(eventName: string, fn: ListenerFn): void {
        const onceCallback = (data?: any) => {
            fn.call(this, data);
            this.removeViewListener(eventName, onceCallback);
        };
        this.addViewListener(eventName, onceCallback);
    }

    protected removeViewListener(eventName: string, fn: ListenerFn): void {
        if (this.unMapListenerToEvent(eventName, fn, this.viewListenersMap)) {
            this.view.off(eventName, fn, this);
        } else {
            console.warn(`${fn} is not a listener for event ${eventName}`);
        }
    }

    protected removeViewListeners(eventName: string): void {
        const listenersForEvent: ListenerFn[] = this.viewListenersMap[eventName];
        if (listenersForEvent) {
            for (const fn of listenersForEvent) {
                this.view.off(eventName, fn, this);
            }
            delete this.viewListenersMap[eventName];
        } else {
            console.warn(`There are no any listeners for event ${eventName}`);
        }
    }

    protected removeAllViewListeners(): void {
        for (const key of Object.keys(this.viewListenersMap)) {
            this.removeViewListeners(key);
        }
        this.viewListenersMap = {};
    }

    public setView(view: IView): void {
        this.view = view;
        this.initialize();
    }

    protected abstract initialize(): void;
}