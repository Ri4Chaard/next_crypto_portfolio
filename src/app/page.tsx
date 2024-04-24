"use client";
import { useFetching } from "@/hooks/useFetching";
import { useState } from "react";
import Web3 from "web3";
import { tokenAbi } from "../interfaces/index";

class Wallet {
    public address: string | undefined;
    public balance: number | undefined;
    public tokens: any;
    public constructor(address: string, balance: number, tokens: any) {
        this.address = address;
        this.balance = balance;
        this.tokens = tokens;
    }
}

export default function Home() {
    const [address, setAddress] = useState("");
    const [counter, setCounter] = useState(0);
    const [wallets, setWallets] = useState<any>([]);

    const web3 = new Web3(
        "https://mainnet.infura.io/v3/4adb0c0cdb4d4d7c95db33dad1a57ae3"
    );

    const [fetchWallet, isWalLoading, walError] = useFetching(
        async (address: string, contracts: string[]) => {
            const ethBal = await web3.eth.getBalance(address);
            const balance = web3.utils.fromWei(ethBal, "ether");
            const tokenBalances: object[] = [];
            console.log("worked!");

            await Promise.all(
                contracts.map(async (contr: any) => {
                    let tokenContract = new web3.eth.Contract(
                        tokenAbi,
                        contr.contract
                    );
                    const tokenBal: any = await tokenContract.methods
                        .balanceOf(address)
                        .call();
                    let decimals: any = await tokenContract.methods
                        .decimals()
                        .call();
                    const finres = Number(tokenBal) * 10 ** -Number(decimals);
                    tokenBalances.push({ id: contr.id, balance: finres });
                })
            );

            const wallet = new Wallet(address, +balance, tokenBalances);
            setWallets([...wallets, wallet]);
        }
    );

    const getBalanceByAdress = async (address: string) => {
        fetchWallet(address, [
            {
                id: "tether",
                contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            },
            {
                id: "asd",
                contract: "0x6Bba316c48b49BD1eAc44573c5c871ff02958469",
            },
            {
                id: "asdads",
                contract: "0x0d02755a5700414B26FF040e1dE35D337DF56218",
            },
        ]);
        setCounter(counter + 1);
        setAddress("");
    };

    console.log(wallets);

    return (
        <div className="container mx-auto">
            <div>
                <input
                    value={address}
                    type="text"
                    className="text-black"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={() => getBalanceByAdress(address)}>
                    Press me
                </button>
                <p>{counter}</p>
                {isWalLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {wallets.map((wallet: Wallet, index: number) => (
                            <div key={index} className="mb-4">
                                <h1 className="text-3xl mb-2">
                                    {wallet.address}
                                </h1>
                                <p>Balance: {wallet.balance} ETH</p>
                                {wallet.tokens.map((token: any) => (
                                    <p key={token.id}>
                                        {token.id}: {token.balance}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
