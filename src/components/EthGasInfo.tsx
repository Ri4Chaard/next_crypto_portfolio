import ethLogo from "@/icons/eth.png";
import {
    ArrowDownRightIcon,
    ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
interface EthGasInfo {
    ethInfo: any;
    gasPrice: number;
}
export const EthGasInfo = ({ ethInfo, gasPrice }: EthGasInfo) => {
    console.log(ethInfo);

    return (
        <div className="flex flex-col p-3 justify-between w-full border-t border-solid border-slate-800">
            <div className="flex justify-between text-xl text-slate-400">
                <p>Ethereum</p>
                <p>Gas price</p>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <img className="w-24 h-24 mr-2" src={ethInfo[0].image} />
                    <p className="text-3xl mr-2">
                        ${ethInfo[0].current_price.toLocaleString()}
                    </p>
                    {ethInfo[0].price_change_percentage_24h < 0 ? (
                        <ArrowDownRightIcon className="w-5 h-5 text-red-700" />
                    ) : (
                        <ArrowUpRightIcon className="w-5 h-5 text-green-700" />
                    )}
                    <p
                        className={
                            ethInfo[0].price_change_percentage_24h < 0
                                ? "text-red-700"
                                : "text-green-700"
                        }
                    >
                        {ethInfo[0].price_change_percentage_24h}
                        {"% (24h)"}
                    </p>
                </div>
                <div className="flex items-center">
                    <Image
                        className="mr-2"
                        src={ethLogo}
                        width={40}
                        height={40}
                        alt="gasPrice"
                    />
                    <p className="text-2xl">{gasPrice}</p>
                </div>
            </div>
        </div>
    );
};
