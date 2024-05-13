import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Web3 from "web3";

interface TxList {
    txList: any;
}
export const TxList = ({ txList }: TxList) => {
    const t = useTranslations("Portfolio");
    return (
        <div className="w-full">
            <p className="p-3 text-2xl font-bold border-y border-solid border-slate-800">
                {t("TXTitle")}
            </p>
            <div className="flex p-3 justify-between border-b border-solid border-slate-800 text-slate-400">
                <p className="px-2 w-1/6">{t("TXHash")}</p>
                <p className="px-2 w-1/6">{t("TXFrom")}</p>
                <p className="px-2 w-1/6">{t("TXTo")}</p>
                <p className="px-2 w-1/6 text-right">{t("TXValue")}</p>
            </div>
            {txList &&
                txList.map((tx: any) => (
                    <a
                        key={tx.hash}
                        className="text-white flex px-3 py-2 justify-between border-b border-solid border-slate-800 hover:bg-slate-800"
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
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
                    </a>
                ))}
        </div>
    );
};
