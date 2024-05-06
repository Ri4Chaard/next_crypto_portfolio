"use client";
import { WalletIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useContext } from "react";
import { Refresher } from "./UI/Refresher";
import { TokensContext } from "@/context";
import { TokensSearch } from "./TokensSearch";

export const HeaderNavbar = () => {
    const { tokError, upDate, setRefresh } = useContext(TokensContext);
    return (
        <div className="text-xl text-cyan-600 font-bold py-4 flex justify-between items-center border-b border-solid border-slate-800">
            <div>
                <Link className="mx-3 hover:text-cyan-400" href="/">
                    Main
                </Link>
            </div>
            <div className="font-normal">
                <TokensSearch />
            </div>
            <div className="flex items-center">
                <Link
                    className="mx-3 flex items-center hover:text-cyan-400"
                    href="/portfolio"
                >
                    <WalletIcon className="mr-2 w-8 h-8" />
                    Portfolio
                </Link>
                <Link className="mx-3 hover:text-cyan-400" href="/about">
                    About
                </Link>
                <div className="mx-3 font-normal flex items-center">
                    <Refresher
                        tokError={tokError}
                        upDate={upDate}
                        setRefresh={setRefresh}
                    />
                </div>
            </div>
        </div>
    );
};
