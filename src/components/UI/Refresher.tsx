import { ArrowPathIcon } from "@heroicons/react/20/solid";

interface Refresher {
    tokError: any;
    upDate: string;
    setRefresh: any;
}

export const Refresher = ({ tokError, upDate, setRefresh }: Refresher) => {
    return (
        <>
            {tokError ? (
                <p className="pr-2 text-red-700">{tokError.message}</p>
            ) : (
                <p className="pr-2 text-green-700">Updated successfully</p>
            )}
            <p className="pr-2">{upDate}</p>
            <ArrowPathIcon
                className="h-8 w-8 cursor-pointer hover:animate-spin"
                onClick={() => setRefresh(true)}
            />
        </>
    );
};
