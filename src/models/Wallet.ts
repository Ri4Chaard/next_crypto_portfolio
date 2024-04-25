export class Wallet {
    public address: string | undefined;
    public balance: number | undefined;
    public tokens: any;
    public constructor(address: string, balance: number, tokens: any) {
        this.address = address;
        this.balance = balance;
        this.tokens = tokens;
    }
}
