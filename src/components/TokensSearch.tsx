import { TokensContext } from "@/context";
import {
    ArrowDownRightIcon,
    ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useContext, useState } from "react";

export const TokensSearch = () => {
    const { tokens } = useContext(TokensContext);
    const [serchedTokens, setSearchedTokens] = useState(tokens);
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(false);
    const handleFilterInput = (e: any) => {
        const searchToken = e.target.value;
        setSearch(searchToken);
        const filteredTokens = tokens.filter((token: any) =>
            token.name.toLowerCase().includes(searchToken.toLowerCase())
        );
        setSearchedTokens(filteredTokens);
    };

    return (
        <div className="flex items-center">
            <p className="pr-2">Search for token</p>
            <div className="relative">
                <input
                    className="p-1 mr-2 w-[400px] border border-solid border-cyan-600 rounded bg-slate-900"
                    value={search}
                    onChange={handleFilterInput}
                    placeholder="Type here.."
                    onFocus={() => {
                        setVisible(true);
                    }}
                    onBlur={() => {
                        setVisible(false);
                    }}
                />
                {visible && search.length > 0 && (
                    <div className="z-10 max-h-96 overflow-y-auto w-[400px] absolute top-9 left-0 border border-solid border-cyan-600 rounded-b bg-slate-900 text-white">
                        {serchedTokens.length ? (
                            serchedTokens.map((token: any) => (
                                <Link
                                    key={token.id}
                                    className="flex flex-col items-center border-b border-solid border-slate-800 hover:bg-slate-800"
                                    href={`/tokens/${token.id}`}
                                >
                                    <div className="flex w-full justify-between items-center px-3 h-24">
                                        <div className="flex flex-row-reverse w-52 justify-end items-center">
                                            <h2 className="text-xl text-left text-white font-bold mr-2">
                                                {token.name}
                                            </h2>
                                            <img
                                                className="w-12 h-12 mr-3"
                                                src={token.image}
                                                alt="not found"
                                            />
                                        </div>
                                        <p className="text-right text-lg  text-white">
                                            $
                                            {token.current_price.toLocaleString(
                                                "en-US"
                                            )}
                                        </p>
                                        <div className="flex items-center justify-end text-lg">
                                            {token.price_change_percentage_24h <
                                            0 ? (
                                                <ArrowDownRightIcon className="w-5 h-5 text-red-700" />
                                            ) : (
                                                <ArrowUpRightIcon className="w-5 h-5 text-green-700" />
                                            )}
                                            <p
                                                className={
                                                    token.price_change_percentage_24h <
                                                    0
                                                        ? " text-red-700"
                                                        : " text-green-700"
                                                }
                                            >
                                                {token.price_change_percentage_24h.toFixed(
                                                    4
                                                )}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex justify-center">
                                <p className="w-96 p-3 text-center">
                                    No tokens found
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
