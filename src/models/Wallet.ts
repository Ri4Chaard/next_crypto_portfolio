export class Wallet {
    public address: string;
    public balance: number;
    public tokens: any;
    public transactions?: any;

    public constructor(
        address: string,
        balance: number,
        tokens: any,
        transactions?: any
    ) {
        this.address = address;
        this.balance = balance;
        this.tokens = tokens;
        this.transactions = transactions;
    }
}
