"use client";
import { TokensContext } from "@/context";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { Loader } from "./UI/Loader";

export const MarketData = () => {
    const {
        globalMarketData,
        isGlobalMarketDataLoading,
        globalMarketDataError,
    } = useContext(TokensContext);
    return (
        <div className="mb-3 text-slate-400 flex justify-between px-3 py-1 border-b border-solid border-slate-800">
            {isGlobalMarketDataLoading ? (
                <div className="w-full">
                    <Loader />
                </div>
            ) : (
                globalMarketData.data && (
                    <>
                        <p>
                            {"Active cryptocurrencies: "}
                            <span className="text-white">
                                {globalMarketData.data.active_cryptocurrencies}
                            </span>
                        </p>
                        <p className="flex items-center">
                            {"Market cap change: "}
                            {globalMarketData.data
                                .market_cap_change_percentage_24h_usd > 0 ? (
                                <ChevronUpIcon className="w-5 h-5 text-green-700" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-red-700" />
                            )}
                            <span
                                className={
                                    globalMarketData.data
                                        .market_cap_change_percentage_24h_usd >
                                    0
                                        ? "text-green-700"
                                        : "text-red-700"
                                }
                            >
                                {"$"}
                                {globalMarketData.data.market_cap_change_percentage_24h_usd.toFixed(
                                    4
                                )}
                            </span>
                        </p>
                        <div className="flex items-center">
                            <p>
                                {"Upcoming icos: "}
                                <span className="text-white">
                                    {globalMarketData.data.upcoming_icos}
                                </span>
                            </p>
                            <p className="px-3">
                                {"Ongoing icos: "}{" "}
                                <span className="text-white">
                                    {globalMarketData.data.ongoing_icos}
                                </span>
                            </p>
                            <p>
                                {"Ended icos: "}
                                <span className="text-white">
                                    {globalMarketData.data.ended_icos}
                                </span>
                            </p>
                        </div>
                    </>
                )
            )}
        </div>
    );
};
