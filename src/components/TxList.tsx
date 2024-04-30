import { useEffect, useState } from "react";
import Web3 from "web3";

interface TxList {
    txList: any;
}
export const TxList = ({ txList }: TxList) => {
    console.log(txList);

    return (
        <div>
            {txList &&
                txList.map((tx: any) => (
                    <div key={tx.hash} className="flex">
                        <p className="px-2">{tx.hash.slice(0, 5)}</p>
                        <p className="px-2">{tx.from.slice(0, 5)}</p>
                        <p className="px-2">{tx.to.slice(0, 5)}</p>
                        <p className="px-2">
                            {Web3.utils.fromWei(tx.value, "ether")}
                        </p>
                    </div>
                ))}
        </div>
    );
};
