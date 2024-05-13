"use client";
import { useFetching } from "@/hooks/useFetching";
import { tokenAbi } from "@/interfaces";
import { Wallet } from "@/models/Wallet";
import { erc20 } from "@/data/tokens";
import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { WalletInfo } from "@/components/WalletInfo";
import { PortfolioTopbar } from "@/components/PortfolioTopbar";
import { TokensContext } from "@/context";
import { Loader } from "@/components/UI/Loader";
import { useTranslations } from "next-intl";

export default function page() {
    const t = useTranslations("Portfolio");
    const [address, setAddress] = useState("");
    const [wallets, setWallets] = useState<any>([]);
    const [selectedWallet, setSelectedWallet] = useState(0);
    const [txList, setTxList] = useState<any>(null);
    const [gasPrice, setGasPrice] = useState(0);
    const { tokens, isTokLoading, tokError, refresh } =
        useContext(TokensContext);
    const web3 = new Web3(
        "https://mainnet.infura.io/v3/4adb0c0cdb4d4d7c95db33dad1a57ae3"
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

    const [fetchGasPrice, isGasPriceLoading, gasPriceError] = useFetching(
        async () => {
            const gas = await web3.eth.getGasPrice();
            setGasPrice(Number(web3.utils.fromWei(gas, "gwei")));
        }
    );

    const [fetchWallet, isWalLoading, walError] = useFetching(
        async (address: string, contracts: any[]) => {
            const ethBal = await web3.eth.getBalance(address);
            const ethBalance = web3.utils.fromWei(ethBal, "ether");
            let ethBalanceInUSD: number = 0;
            tokens
                .filter((curr: any) => curr.id == "ethereum")
                .map(
                    (curr: any) =>
                        (ethBalanceInUSD = +ethBalance * curr.current_price)
                );

            const tokenBalances: object[] = [
                {
                    id: "ethereum",
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
                tokens
                    .filter((curr: any) => curr.id == contr.id)
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
            if (
                wallets.filter((wal: Wallet) => wallet.address === wal.address)
                    .length > 0
            ) {
                let indexOfUpdate: number = 0;
                wallets.map((wal: Wallet, index: number) => {
                    if (wal.address == wallet.address) indexOfUpdate = index;
                });
                wallets[indexOfUpdate] = wallet;
                setWallets(wallets);
            } else setWallets([...wallets, wallet]);
        }
    );

    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        if (storedWallets) setWallets(JSON.parse(storedWallets));
    }, []);

    useEffect(() => {
        if (txList)
            wallets
                .filter((wallet: any) => wallet.address === txList.address)
                .map(
                    (wallet: any) => (wallet.transactions = txList.transactions)
                );
        setTxList(null);
    }, [txList]);

    useEffect(() => {
        if (wallets.length > 0)
            localStorage.setItem("wallets", JSON.stringify(wallets));
    }, [wallets, txList]);

    useEffect(() => {
        fetchGasPrice();
    }, [refresh]);

    const getBalanceByAdress = async (address: string) => {
        setSelectedWallet(wallets.length);
        await fetchWallet(address, erc20);
        await fetchTxList(address);
        setAddress("");
    };
    const deleteWallet = (index: number) => {
        setWallets(
            wallets.filter(
                (wallet: Wallet, walIndex: number) => index !== walIndex
            )
        );
        if (selectedWallet != 0) setSelectedWallet(selectedWallet - 1);
        localStorage.setItem(
            "wallets",
            JSON.stringify(
                wallets.filter(
                    (wallet: Wallet, walIndex: number) => index !== walIndex
                )
            )
        );
    };

    const refreshWallet = async (index: number) => {
        await fetchWallet(wallets[index].address, erc20);
        await fetchTxList(wallets[index].address);
    };

    return (
        <div className="container mx-auto">
            <div>
                <PortfolioTopbar
                    wallets={wallets}
                    address={address}
                    setAddress={setAddress}
                    addWallet={getBalanceByAdress}
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                />
                {isTokLoading ? (
                    <div className="flex font-bold text-xl justify-center items-center h-svh">
                        <p className="mr-3">{t("CurrLoading")}</p> <Loader />
                    </div>
                ) : (
                    <>
                        {isWalLoading ? (
                            <div className="flex font-bold text-xl justify-center items-center h-svh">
                                <p className="mr-3">{t("WalletLoading")}</p>
                                <Loader />
                            </div>
                        ) : (
                            <>
                                {wallets.map(
                                    (wallet: Wallet, index: number) =>
                                        selectedWallet == index && (
                                            <WalletInfo
                                                key={wallet.address}
                                                wallet={wallet}
                                                gasPrice={gasPrice}
                                                gasPriceLoading={
                                                    isGasPriceLoading
                                                }
                                                gasPriceError={gasPriceError}
                                                currInfo={tokens}
                                                isTxListLoading={
                                                    isTxListLoading
                                                }
                                                txListError={txListError}
                                                deleteWal={() =>
                                                    deleteWallet(index)
                                                }
                                                refreshWal={() => {
                                                    refreshWallet(index);
                                                }}
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
