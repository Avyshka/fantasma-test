import {ServerConstants} from "../ServerConstants";
import {IReelView} from "../../gameFlow/interfaces/ResultInterfaces";

export class ServerModel {

    public balance: number = ServerConstants.balance;
    public bet: number = ServerConstants.bet;

    private stop: number;
    private _view: IReelView;
    private _totalWin: number;
    private _winSymbolPositions: number[];

    public doSpin(stop?: number): void {
        const set: number[] = this.set;
        this.stop = stop === undefined ? Math.floor(Math.random() * set.length) : stop;
        if (this.stop + 3 >= set.length) {
            set.concat(set);
        }
        const screen: number[] = set.slice(this.stop, this.stop + 3);
        this._view = {
            stop: this.stop,
            above: this.stop > 0 ? set[this.stop - 1] : set[set.length - 1],
            screen: screen,
            below: set[this.stop + 3]
        };
        this.countWinnings(screen);
    }

    private countWinnings(screen: number[]): void {
        const countSymbols: Record<number, number> = screen.reduce((acc: Record<string, number>, item: number) => {
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
            this._totalWin = winSymbolData[winSymbolId] * this.bet;
            this._winSymbolPositions = screen
                .map((symbolId: number, lineId: number) => {
                    if (symbolId === winSymbolId) {
                        return lineId;
                    }
                })
                .filter((position: number) => position !== undefined);
        } else {
            this._totalWin = 0;
            this._winSymbolPositions = [];
        }
    }

    public get set(): number[] {
        return ServerConstants.set.map((i: string) => +i.replace("SYM", ""));
    }

    public get view(): IReelView {
        return this._view;
    }

    public get winSymbolPositions(): number[] {
        return this._winSymbolPositions;
    }

    public get totalWin(): number {
        return this._totalWin;
    }
}