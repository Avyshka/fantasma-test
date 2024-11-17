import {IView} from "../../views/interfaces/IView";

export interface IMediator {
    setView(view: IView): void;
}