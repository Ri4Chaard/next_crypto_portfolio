interface TokenMarkets {
    token: any;
    perPage: number;
    page: number;
}
export const TokenMarkets = ({ token, perPage, page }: TokenMarkets) => {
    return (
        <>
            <div className="flex flex-col items-center w-full border-y border-solid border-slate-800">
                <div className="flex justify-between items-center p-6 w-full h-8 text-slate-400">
                    <div className="flex w-1/5 items-center">
                        <p className="mr-2">#</p>
                        <h3 className="mr-2 font-bold">Exchange</h3>
                    </div>
                    <div className="w-1/5 text-left">
                        <p>Pair</p>
                    </div>
                    <div className="w-1/5 text-right">
                        <p>Price</p>
                    </div>
                    <div className="w-1/5 text-right">
                        <p>Volume{"(24h)"}</p>
                    </div>
                    <div className="w-1/5 text-right">
                        <p>Trust score</p>
                    </div>
                </div>
            </div>
            {token.tickers
                .slice(perPage * page - perPage, perPage * page)
                .map((ticker: any, index: number) => (
                    <div className="flex flex-col items-center w-full border-b border-solid border-slate-800 hover:bg-slate-800">
                        <a
                            className="flex  justify-between items-center p-6 w-full h-8"
                            href={ticker.trade_url}
                            target="_blank"
                        >
                            <div className="flex w-1/5 items-center">
                                <p className="text-white mr-2">
                                    {perPage * page + index + 1 - perPage}
                                </p>
                                <h3 className="text-white mr-2 font-bold">
                                    {ticker.market.name}
                                </h3>
                            </div>
                            <div className="w-1/5 text-left">
                                <p>
                                    {ticker.base.length > 6
                                        ? ticker.base.slice(0, 5) + "..."
                                        : ticker.base}
                                    <span className="text-white mx-1">/</span>
                                    {ticker.target.length > 6
                                        ? ticker.target.slice(0, 5) + "..."
                                        : ticker.target}
                                </p>
                            </div>
                            <div className="w-1/5 text-right">
                                <p className="text-white">${ticker.last}</p>
                            </div>
                            <div className="w-1/5 text-right">
                                <p className="text-white">
                                    ${ticker.volume.toLocaleString("en-US")}
                                </p>
                            </div>
                            <div className="flex w-1/5 justify-end">
                                {ticker.trust_score ? (
                                    <div
                                        className={
                                            "p-1 rounded-xl self-center w-14 text-center"
                                        }
                                        style={
                                            ticker.trust_score == "green"
                                                ? {
                                                      backgroundColor:
                                                          "rgb(21 128 61)",
                                                  }
                                                : {
                                                      backgroundColor:
                                                          ticker.trust_score ==
                                                          "yellow"
                                                              ? "rgb(161 98 7)"
                                                              : "rgb(185 28 28",
                                                  }
                                        }
                                    >
                                        <p className="text-slate-950">
                                            {ticker.trust_score == "green" &&
                                                "High"}
                                            {ticker.trust_score == "yellow" &&
                                                "Mid"}
                                            {ticker.trust_score == "red" &&
                                                "Low"}
                                        </p>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            "p-1 rounded-xl self-center w-14 text-center bg-slate-800 "
                                        }
                                    >
                                        <p className="text-slate-950">N/A</p>
                                    </div>
                                )}
                            </div>
                        </a>
                    </div>
                ))}
        </>
    );
};
