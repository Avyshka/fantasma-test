export class MoneyFormatter {
    private static instance: MoneyFormatter;

    private currency: string;

    private constructor() {
    }

    public static getInstance(): MoneyFormatter {
        if (!MoneyFormatter.instance) {
            MoneyFormatter.instance = new MoneyFormatter();
        }
        return MoneyFormatter.instance;
    }

    public setCurrency(value: string): void {
        this.currency = value;
    }

    public format(value: number): string {
        return `${this.currency} ${value.toFixed(2)}`;
    }
}