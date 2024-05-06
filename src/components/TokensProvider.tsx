"use client";
import { useFetching } from "@/hooks/useFetching";
import { useEffect, useState } from "react";
import { TokensContext } from "@/context/index.js";
interface TokensProvider {
    children: React.ReactNode;
}

export const TokensProvider = ({ children }: TokensProvider) => {
    const [tokens, setTokens] = useState([]);
    const [filteredTokens, setFilteredTokens] = useState([]);
    const [upDate, setUpDate] = useState("");
    const [refresh, setRefresh] = useState(false);

    const addTimeStamp = () => {
        let date = new Date();
        const lastUpdate = `Last update: ${
            date.getDate() < 10 ? "0" : ""
        }${date.getDate()}.${date.getMonth() < 10 ? "0" : ""}${
            date.getMonth() + 1
        } at ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
            date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`;
        return lastUpdate;
    };

    const axios = require("axios");
    const [fetchTokens, isTokLoading, tokError] = useFetching(
        async (url: string) => {
            const response = await axios.get(url);
            setTokens(response.data);
            setFilteredTokens(response.data);
            localStorage.setItem(
                "fetchedTokens",
                JSON.stringify(response.data)
            );
            const lastUpdate = addTimeStamp();
            setUpDate(lastUpdate);
            localStorage.setItem("lastUpdate", JSON.stringify(lastUpdate));
        }
    );

    useEffect(() => {
        const storedTokens: any = localStorage.getItem("fetchedTokens");
        const lastUpdate: any = localStorage.getItem("lastUpdate");
        if (storedTokens) {
            setTokens(JSON.parse(storedTokens));
            setFilteredTokens(JSON.parse(storedTokens));
            setUpDate(JSON.parse(lastUpdate));
        } else {
            fetchTokens(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
            );
        }
    }, []);

    useEffect(() => {
        if (refresh)
            fetchTokens(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
            );
        setRefresh(false);
    }, [refresh]);

    return (
        <TokensContext.Provider
            value={{
                tokens,
                filteredTokens,
                setFilteredTokens,
                isTokLoading,
                tokError,
                upDate,
                refresh,
                setRefresh,
            }}
        >
            {children}
        </TokensContext.Provider>
    );
};
