import Image from "next/image";
import walletImg from "@/icons/wallet.png";
import { EthGasInfo } from "./EthGasInfo";
import { TxList } from "./TxList";
import { TokensPieChart } from "./TokensPieChart";
import { WalletTokenList } from "./WalletTokenList";
import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Modal } from "./UI/Modal";
import { useState } from "react";
import { Loader } from "./UI/Loader";
import { useTranslations } from "next-intl";

interface WalletInfo {
    wallet: any;
    gasPrice: number;
    gasPriceLoading: boolean;
    gasPriceError: any;
    currInfo: any;
    isTxListLoading: boolean;
    txListError: any;
    deleteWal: any;
    refreshWal: any;
}

export const WalletInfo = ({
    wallet,
    gasPrice,
    gasPriceLoading,
    gasPriceError,
    currInfo,
    isTxListLoading,
    txListError,
    deleteWal,
    refreshWal,
}: WalletInfo) => {
    const t = useTranslations("Portfolio");
    const [modal, setModal] = useState(false);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center bg-cyan-600 p-3">
                <h1 className="text-2xl ">{wallet.address}</h1>
                <div className="flex items-center text-slate-900">
                    <button className="mr-2" onClick={refreshWal}>
                        <ArrowPathIcon className="w-7 h-7 hover:animate-spin" />
                    </button>
                    <p className="mr-2 font-bold">{wallet.lastUpdate}</p>
                    <button onClick={() => setModal(true)}>
                        <XCircleIcon className="w-7 h-7  hover:text-red-700" />
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2 border-r border-solid border-slate-800">
                    <div className="flex flex-col justify-around h-96">
                        <p className="text-2xl mb-3">{t("Overview")}</p>
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
                                        {t("WalBalance")}
                                    </p>
                                    <p className="text-3xl ">
                                        ${wallet.balance.toFixed(4)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <EthGasInfo
                                ethInfo={currInfo.filter(
                                    (token: any) => token.symbol == "eth"
                                )}
                                gasPrice={gasPrice}
                                gasPriceLoading={gasPriceLoading}
                                gasPriceError={gasPriceError}
                            />
                        </div>
                    </div>
                    {isTxListLoading ? (
                        <div className="flex font-bold text-xl justify-center items-center">
                            <p className="mr-3">{t("TXLoading")}</p>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {txListError ? (
                                <p>{txListError.message}</p>
                            ) : (
                                <TxList txList={wallet.transactions} />
                            )}
                        </>
                    )}
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <div className="h-96 p-3 w-full flex justify-center">
                        <TokensPieChart
                            tokens={wallet.tokens.filter(
                                (token: any) => token.balance > 0
                            )}
                        />
                    </div>
                    <WalletTokenList wallet={wallet} currInfo={currInfo} />
                </div>
            </div>
            <Modal visible={modal} setVisible={() => setModal(false)}>
                <div className="w-96">
                    <p className="text-xl mb-3 text-center">{t("DelText")}</p>
                    <div className="flex justify-around">
                        <button
                            className="font-bold w-1/2 p-2 mr-2 border border-solid border-cyan-600 rounded hover:border-green-700 hover:bg-green-700 hover:text-slate-900"
                            onClick={() => {
                                deleteWal();
                                setModal(false);
                            }}
                        >
                            {t("DelYes")}
                        </button>
                        <button
                            className="font-bold w-1/2 p-2 border border-solid border-cyan-600 rounded hover:border-red-700 hover:bg-red-700 hover:text-slate-900"
                            onClick={() => setModal(false)}
                        >
                            {t("DelNo")}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
