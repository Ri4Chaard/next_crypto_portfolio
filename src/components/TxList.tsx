import { useEffect, useState } from "react";
import Web3 from "web3";

interface TxList {
    txList: any;
}
export const TxList = ({ txList }: TxList) => {
    console.log(txList);

    return (
        <div className="w-full">
            <p className="p-3 text-2xl font-bold border-y border-solid border-slate-800">
                Last transactions
            </p>
            <div className="flex p-3 justify-between border-b border-solid border-slate-800 text-slate-400">
                <p className="px-2 w-1/6">Hash</p>
                <p className="px-2 w-1/6">From</p>
                <p className="px-2 w-1/6">To</p>
                <p className="px-2 w-1/6 text-right">Value</p>
            </div>
            {txList &&
                txList.map((tx: any) => (
                    <div
                        key={tx.hash}
                        className="flex px-3 py-2 justify-between border-b border-solid border-slate-800"
                    >
                        <p className="px-2 w-1/6">
                            {tx.hash.slice(0, 5) + "..."}
                        </p>
                        <p className="px-2 w-1/6">
                            {tx.from.slice(0, 5) + "..."}
                        </p>
                        <p className="px-2 w-1/6">
                            {tx.to.slice(0, 5) + "..."}
                        </p>
                        <p className="px-2 w-1/6 text-right">
                            {Number(
                                Web3.utils.fromWei(tx.value, "ether")
                            ).toFixed(4)}{" "}
                            ETH
                        </p>
                    </div>
                ))}
        </div>
    );
};
