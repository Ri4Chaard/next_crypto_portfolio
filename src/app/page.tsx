"use client";
import { FetchedTokens } from "@/components/FetchedTokens";
import { Loader } from "@/components/UI/Loader";
import { Pagination } from "@/components/UI/Pagination";
import { ShowRows } from "@/components/UI/ShowRows";
import { TokensContext } from "@/context";
import { getPageCount } from "@/hooks/usePagination";
import { useContext, useEffect, useState } from "react";

export default function Home() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState("");
    const {
        tokens,
        filteredTokens,
        setFilteredTokens,
        isTokLoading,
        tokError,
        globalMarketData,
        isGlobalMarketDataLoading,
        globalMarketDataError,
        refresh,
    } = useContext(TokensContext);

    useEffect(() => {
        setFilter("");
    }, [refresh]);

    useEffect(() => {
        setPage(1);
        setFilter("");
        setTotalPages(getPageCount(100, perPage));
    }, [perPage]);

    const changePage = (page: number) => {
        setPage(page);
    };

    return (
        <div className="container mx-auto">
            {isTokLoading ? (
                <div className="flex flex-col p-3">
                    <Loader />
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold">
                        Cryptocurrency Prices
                    </h1>
                    <div className="flex items-center justify-end text-white p-3 pb-6">
                        <ShowRows setPerPage={setPerPage} />
                    </div>
                    <div className="flex flex-col items-center">
                        <FetchedTokens
                            filteredTokens={filteredTokens}
                            perPage={perPage}
                            page={page}
                        />
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                        <Pagination
                            curPage={page}
                            changePage={changePage}
                            totalPages={totalPages}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
