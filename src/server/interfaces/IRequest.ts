import {ServerRequestType} from "../types/ServerRequestType";

export interface IRequest {
    message: ServerRequestType;
    payload?: {
        bet?: number;
        balance?: number;
    }
}