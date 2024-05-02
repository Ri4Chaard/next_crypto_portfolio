"use client";
import { useFetching } from "@/hooks/useFetching";
import { tokenAbi } from "@/interfaces";
import { Wallet } from "@/models/Wallet";
import { erc20 } from "@/data/tokens";
import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { WalletInfo } from "@/components/WalletInfo";

export default function page() {
    const [address, setAddress] = useState("");
    const [wallets, setWallets] = useState<any>([]);
    const [selectedWallet, setSelectedWallet] = useState(0);
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
            const gas = await web3.eth.getGasPrice();
            setGasPrice(Number(web3.utils.fromWei(gas, "ether")));
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

    const addTimeStamp = () => {
        let date = new Date();
        const lastUpdate = `Last update: ${
            date.getDate() < 10 ? "0" : ""
        }${date.getDate()}.${date.getMonth() < 10 ? "0" : ""}${
            date.getMonth() + 1
        } at ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
            date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`;
        return lastUpdate;
    };

    const [fetchWallet, isWalLoading, walError] = useFetching(
        async (address: string, contracts: any[]) => {
            const ethBal = await web3.eth.getBalance(address);
            const ethBalance = web3.utils.fromWei(ethBal, "ether");
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
            const lastUpdate = addTimeStamp();
            const wallet = new Wallet(
                address,
                balance,
                tokenBalances,
                lastUpdate,
                txList
            );
            setWallets([...wallets, wallet]);
        }
    );

    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        if (storedWallets) setWallets(JSON.parse(storedWallets));
    }, []);

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
        if (wallets.length > 0)
            localStorage.setItem("wallets", JSON.stringify(wallets));
        setTxList(null);
    }, [txList]);

    const getBalanceByAdress = async (address: string) => {
        await fetchWallet(address, erc20);
        await fetchTxList(address);
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
                    Add wallet
                </button>
                <div className="flex">
                    <button
                        disabled={selectedWallet == 0}
                        onClick={() => setSelectedWallet(selectedWallet - 1)}
                    >
                        prev wallet
                    </button>
                    <p>
                        {selectedWallet + 1}/{wallets.length}
                    </p>
                    <button
                        disabled={selectedWallet == wallets.length - 1}
                        onClick={() => setSelectedWallet(selectedWallet + 1)}
                    >
                        next wallet
                    </button>
                </div>
                {isCurrLoading ? (
                    <div>Curr info loading...</div>
                ) : (
                    <>
                        {isWalLoading ? (
                            <div>Wallet info loading...</div>
                        ) : (
                            <>
                                {wallets.map(
                                    (wallet: Wallet, index: number) =>
                                        selectedWallet == index && (
                                            <WalletInfo
                                                key={index}
                                                wallet={wallet}
                                                index={index}
                                                gasPrice={gasPrice}
                                                currInfo={currInfo}
                                                isTxListLoading={
                                                    isTxListLoading
                                                }
                                                txListError={txListError}
                                            />
                                        )
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
