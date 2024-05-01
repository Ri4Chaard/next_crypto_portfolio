"use client";
import { useFetching } from "@/hooks/useFetching";
import { tokenAbi } from "@/interfaces";
import { Wallet } from "@/models/Wallet";
import { erc20 } from "@/data/tokens";
import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import walletImg from "@/icons/wallet.png";
import Image from "next/image";
import { TokensPieChart } from "@/components/TokensPieChart";
import { TxList } from "@/components/TxList";
import { WalletTokenList } from "@/components/WalletTokenList";
import { EthGasInfo } from "@/components/EthGasInfo";

export default function page() {
    const [address, setAddress] = useState("");
    const [counter, setCounter] = useState(0);
    const [wallets, setWallets] = useState<any>([]);
    const [currInfo, setCurrInfo] = useState<any>();
    const [txList, setTxList] = useState<any>(null);
    const [gasPrice, setGasPrice] = useState(0);
    const [refresh, setRefresh] = useState(false);

    const web3 = new Web3(
        "https://mainnet.infura.io/v3/4adb0c0cdb4d4d7c95db33dad1a57ae3"
    );

    const [fetchCurrencies, isCurrLoading, curError] = useFetching(
        async (url: string) => {
            const response = await axios.get(url);
            setCurrInfo(response.data);
        }
    );

    const [fetchTxList, isTxListLoading, txListError] = useFetching(
        async (address: string) => {
            const response = await axios.get(
                `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=WFNDI727VR689UEXM7YSER7T542PRRW4YN`
            );
            setTxList({
                address: address,
                transactions: response.data.result,
            });
        }
    );

    const [fetchWallet, isWalLoading, walError] = useFetching(
        async (address: string, contracts: any[]) => {
            const ethBal = await web3.eth.getBalance(address);
            const ethBalance = web3.utils.fromWei(ethBal, "ether");
            const gas = await web3.eth.getGasPrice();
            setGasPrice(Number(web3.utils.fromWei(gas, "ether")));
            let ethBalanceInUSD: number = 0;
            currInfo
                .filter((curr: any) => curr.symbol == "eth")
                .map(
                    (curr: any) =>
                        (ethBalanceInUSD = +ethBalance * curr.current_price)
                );

            const tokenBalances: object[] = [
                {
                    id: "eth",
                    balance: +ethBalance,
                    balanceInUSD: ethBalanceInUSD,
                },
            ];

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
                let balOfToken: number = 0;
                currInfo
                    .filter((curr: any) => curr.symbol == contr.id)
                    .map(
                        (curr: any) =>
                            (balOfToken = finres * curr.current_price)
                    );
                tokenBalances.push({
                    id: contr.id,
                    balance: finres,
                    balanceInUSD: balOfToken,
                });

                await delay(500);
            }
            let balance: number = 0;
            tokenBalances.map((token: any) => (balance += token.balanceInUSD));
            const wallet = new Wallet(address, balance, tokenBalances, txList);
            setWallets([...wallets, wallet]);
        }
    );

    useEffect(() => {
        fetchCurrencies(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
    }, [refresh]);

    useEffect(() => {
        if (txList)
            wallets
                .filter((wallet: any) => wallet.address === txList.address)
                .map(
                    (wallet: any) => (wallet.transactions = txList.transactions)
                );
        setTxList(null);
    }, [txList]);

    const getBalanceByAdress = async (address: string) => {
        await fetchWallet(address, erc20);
        await fetchTxList(address);

        setCounter(counter + 1);
        setAddress("");
    };
    console.log(txList);

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
                    Add wallet
                </button>
                <p>{counter}</p>
                {isWalLoading ? (
                    <div>Wallet info loading...</div>
                ) : (
                    <>
                        {wallets.map((wallet: Wallet, index: number) => (
                            <div key={index} className="mb-4">
                                <h1 className="text-2xl bg-cyan-600 p-3">
                                    {wallet.address}
                                </h1>
                                <div className="flex">
                                    <div className="w-1/2 border-r border-solid border-slate-800">
                                        <div className="flex flex-col justify-around h-96">
                                            <p className="text-3xl font-bold mb-3">
                                                Overview
                                            </p>
                                            <div className="flex flex-col  p-3">
                                                <div className="flex justify-between">
                                                    <Image
                                                        width={70}
                                                        height={70}
                                                        src={walletImg}
                                                        alt="wallet icon"
                                                        className="ml-2"
                                                    />
                                                    <div className="mb-3">
                                                        <p className="text-xl text-slate-400 text-right mb-1">
                                                            Wallet balance
                                                        </p>
                                                        <p className="text-3xl ">
                                                            $
                                                            {wallet.balance.toFixed(
                                                                4
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <EthGasInfo
                                                    ethInfo={currInfo.filter(
                                                        (token: any) =>
                                                            token.symbol ==
                                                            "eth"
                                                    )}
                                                    gasPrice={gasPrice}
                                                />
                                            </div>
                                        </div>
                                        {isTxListLoading ? (
                                            <div>
                                                Last transactions loading...
                                            </div>
                                        ) : (
                                            <>
                                                {txListError ? (
                                                    <p>{txListError.message}</p>
                                                ) : (
                                                    <TxList
                                                        txList={
                                                            wallet.transactions
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="w-1/2 flex flex-col items-center">
                                        <div className="h-96 p-3 w-full flex justify-center">
                                            <TokensPieChart
                                                tokens={wallet.tokens.filter(
                                                    (token: any) =>
                                                        token.balance > 0
                                                )}
                                            />
                                        </div>
                                        <WalletTokenList
                                            wallet={wallet}
                                            currInfo={currInfo}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
