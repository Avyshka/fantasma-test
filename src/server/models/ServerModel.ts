import {IReelView} from "../interfaces/ResultInterfaces";
import {ReelsConstants} from "../../reels/ReelsConstants";

export class ServerModel {

    public balance: number = ServerConstants.balance;
    public bet: number = ServerConstants.bet;
    public currency: string = ServerConstants.currency;

    private stop: number[];
    private _view: IReelView;
    private _totalWin: number;
    private _winSymbolPositions: number[][];

    public doInit(): void {
        this.setStopPositions();
        this.setView();
    }

    public doSpin(): void {
        this.setStopPositions();
        this.setView();
        this.countWinnings(this.view.screen);
        this.balance += this.totalWin;
    }

    private setStopPositions(): void {
        this.stop = Array(ReelsConstants.COUNT_REELS)
            .fill(0)
            .map((_, index: number) => Math.floor(Math.random() * this.set[index].length));
    }

    private setView(): void {
        this._view = {
            stop: [],
            above: [],
            screen: [],
            below: []
        };
        this.stop.forEach((stop: number, i: number) => {
            const tape: number[] = this.set[i];
            if (stop + ReelsConstants.COUNT_LINES >= tape.length) {
                tape.push(...tape);
            }
            this._view.stop.push(stop);
            this._view.above.push(stop > 0 ? tape[stop - 1] : tape[tape.length - 1]);
            this._view.screen.push(tape.slice(stop, stop + ReelsConstants.COUNT_LINES));
            this._view.below.push(tape[stop + ReelsConstants.COUNT_LINES]);
        });
    }

    private countWinnings(screen: number[][]): void {
        this._totalWin = 0;
        this._winSymbolPositions = [];

        screen.forEach((reelView: number[], reelId: number) => {
            const countSymbols: Record<number, number> = reelView.reduce((acc: Record<string, number>, item: number) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {});

            const winSymbolData: Record<number, number> = Object.fromEntries(
                Object
                    .entries(countSymbols)
                    .map(([symbolId, value]) => [+symbolId, value])
                    .filter(([symbolId, value]) => value > 1)
            );

            const symbolIds: string[] = Object.keys(winSymbolData);
            if (symbolIds.length > 0) {
                const winSymbolId: number = +symbolIds[0];
                this._totalWin += winSymbolData[winSymbolId] * this.bet;
                this._winSymbolPositions.push(...reelView
                    .map((symbolId: number, lineId: number) => {
                        if (symbolId === winSymbolId) {
                            return [reelId, lineId];
                        }
                    })
                    .filter((position: number[]) => position !== undefined));
            }
        });
    }

    public get set(): number[][] {
        const tape: number[] = ServerConstants.set.map((i: string) => +i.replace("SYM", ""));
        return Array(ReelsConstants.COUNT_REELS).fill(tape);
    }

    public get view(): IReelView {
        return this._view;
    }

    public get winSymbolPositions(): number[][] {
        return this._winSymbolPositions;
    }

    public get totalWin(): number {
        return this._totalWin;
    }
}

const ServerConstants = {
    balance: 100,
    currency: "USD",
    bet: 1,
    set: [
        "SYM1", "SYM5", "SYM1", "SYM3", "SYM4", "SYM3", "SYM2", "SYM4", "SYM3", "SYM6", "SYM3", "SYM1", "SYM6", "SYM1", "SYM2", "SYM1", "SYM2", "SYM2", "SYM2", "SYM1", "SYM2", "SYM1", "SYM4", "SYM1", "SYM3", "SYM6", "SYM1", "SYM3", "SYM2", "SYM5", "SYM3", "SYM1", "SYM2", "SYM2", "SYM2", "SYM1", "SYM4", "SYM1", "SYM4", "SYM1", "SYM3", "SYM2", "SYM4", "SYM4", "SYM5", "SYM2", "SYM3", "SYM1", "SYM1", "SYM1", "SYM4", "SYM5", "SYM2", "SYM2", "SYM2", "SYM1", "SYM5", "SYM6", "SYM1", "SYM3", "SYM4", "SYM2", "SYM5", "SYM2", "SYM1", "SYM5", "SYM1", "SYM2", "SYM1", "SYM1", "SYM1", "SYM4", "SYM4", "SYM3", "SYM3", "SYM5", "SYM5", "SYM4", "SYM2", "SYM5", "SYM2", "SYM1", "SYM3", "SYM2", "SYM3", "SYM1", "SYM4", "SYM3", "SYM4", "SYM2", "SYM3", "SYM4", "SYM1", "SYM1", "SYM1", "SYM2", "SYM6", "SYM3", "SYM2", "SYM3", "SYM1", "SYM5"
    ],
};