"use client";
import { useFetching } from "@/hooks/useFetching";
import { tokenAbi } from "@/interfaces";
import { Wallet } from "@/models/Wallet";
import { erc20 } from "@/data/tokens";
import { useState } from "react";
import Web3 from "web3";

export default function page() {
    const [address, setAddress] = useState("");
    const [counter, setCounter] = useState(0);
    const [wallets, setWallets] = useState<any>([]);

    const web3 = new Web3(
        "https://mainnet.infura.io/v3/4adb0c0cdb4d4d7c95db33dad1a57ae3"
    );

    const [fetchWallet, isWalLoading, walError] = useFetching(
        async (address: string, contracts: any[]) => {
            const ethBal = await web3.eth.getBalance(address);
            const balance = web3.utils.fromWei(ethBal, "ether");
            const tokenBalances: object[] = [];
            console.log("worked!");

            const delay = (ms: number) =>
                new Promise((resolve) => setTimeout(resolve, ms));

            for (const contr of contracts) {
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

                await delay(500);
            }

            const wallet = new Wallet(address, +balance, tokenBalances);
            setWallets([...wallets, wallet]);
        }
    );

    const getBalanceByAdress = async (address: string) => {
        fetchWallet(address, erc20);
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
