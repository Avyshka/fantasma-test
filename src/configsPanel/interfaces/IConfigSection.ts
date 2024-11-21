import {GUI} from "dat.gui";

export interface IConfigSection {
    createController(): GUI;
}