import { useState } from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>();

    const fetching = async (...args: any) => {
        try {
            setError("");
            setIsLoading(true);
            await callback(...args);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
    return [fetching, isLoading, error];
};
