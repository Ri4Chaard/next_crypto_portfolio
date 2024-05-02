import Image from "next/image";
import walletImg from "@/icons/wallet.png";
import { EthGasInfo } from "./EthGasInfo";
import { TxList } from "./TxList";
import { TokensPieChart } from "./TokensPieChart";
import { WalletTokenList } from "./WalletTokenList";

interface WalletInfo {
    wallet: any;
    index: number;
    gasPrice: number;
    currInfo: any;
    isTxListLoading: boolean;
    txListError: any;
}

export const WalletInfo = ({
    wallet,
    index,
    gasPrice,
    currInfo,
    isTxListLoading,
    txListError,
}: WalletInfo) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center bg-cyan-600 p-3">
                <h1 className="text-2xl ">{wallet.address}</h1>
                <p>{wallet.lastUpdate}</p>
            </div>
            <div className="flex">
                <div className="w-1/2 border-r border-solid border-slate-800">
                    <div className="flex flex-col justify-around h-96">
                        <p className="text-3xl font-bold mb-3">Overview</p>
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
                            />
                        </div>
                    </div>
                    {isTxListLoading ? (
                        <div>Last transactions loading...</div>
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
        </div>
    );
};
