"use client";
import { useFetching } from "@/hooks/useFetching";
import axios from "axios";
import { useEffect, useState } from "react";
import Web3 from "web3";

class Wallet {
    public address: string | undefined;
    public balance: number | undefined;
    public constructor(address: string, balance: number) {
        this.address = address;
        this.balance = balance;
    }
}

export default function Home() {
    const [address, setAddress] = useState("");
    const [counter, setCounter] = useState(0);
    const [wallets, setWallets] = useState<any>([]);
    const [contracts, setContracts] = useState<any>([]);

    const web3 = new Web3(
        "https://mainnet.infura.io/v3/4adb0c0cdb4d4d7c95db33dad1a57ae3"
    );

    const [fetchContracts, isContLoading, contError] = useFetching(
        async (url: string) => {
            const response = await axios.get(url);
            const filteredResponse = response.data.filter(
                (token: any) => token.platforms.ethereum
            );
            setContracts(filteredResponse);
            localStorage.setItem(
                "fetchedContracts",
                JSON.stringify(filteredResponse)
            );
        }
    );

    useEffect(() => {
        const storedContracts = localStorage.getItem("fetchedContracts");
        if (storedContracts) {
            setContracts(JSON.parse(storedContracts));
        } else
            fetchContracts(
                "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
            );
    }, []);

    const getBalanceByAdress = async (address: string) => {
        await web3.eth.getBalance(address).then((res) => {
            const balance = web3.utils.fromWei(res, "ether");
            const wallet = new Wallet(address, +balance);
            setWallets([...wallets, wallet]);
        });
        setCounter(counter + 1);
        setAddress("");
    };

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
                {wallets.map((wallet: Wallet) => (
                    <div key={wallet.address} className="mb-4">
                        <h1 className="text-3xl mb-2">{wallet.address}</h1>
                        <p>Balance: {wallet.balance} ETH</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
