export class Wallet {
    public address: string;
    public balance: number;
    public tokens: any;
    public constructor(address: string, balance: number, tokens: any) {
        this.address = address;
        this.balance = balance;
        this.tokens = tokens;
    }
}
