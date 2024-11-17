export interface IRequest {
    message: "init" | "spin",
    payload?: {
        bet: number
    }
}