export class Wallet {
    public address: string;
    public balance: number;
    public tokens: any;
    public transactions?: any;
    public lastUpdate: string;

    public constructor(
        address: string,
        balance: number,
        tokens: any,
        lastUpdate: string,
        transactions?: any
    ) {
        this.address = address;
        this.balance = balance;
        this.tokens = tokens;
        this.lastUpdate = lastUpdate;
        this.transactions = transactions;
    }
}
