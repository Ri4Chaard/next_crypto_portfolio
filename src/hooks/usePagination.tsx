import { useMemo } from "react";

export const getPageCount = (totalCount: number, perPage: number) => {
    return Math.ceil(totalCount / perPage);
};

export const getPagesArray = (totalPages: number) => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) pages.push(i + 1);
    return pages;
};

export const usePagination = (totalPages: number) => {
    const getMemoPagesArray = useMemo(() => {
        return getPagesArray(totalPages);
    }, [totalPages, getPagesArray]);
    return getMemoPagesArray;
};
