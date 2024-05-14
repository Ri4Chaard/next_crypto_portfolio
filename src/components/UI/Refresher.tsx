import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

interface Refresher {
    tokError: any;
    upDate: string;
    setRefresh: any;
}

export const Refresher = ({ tokError, upDate, setRefresh }: Refresher) => {
    const t = useTranslations("Header");
    return (
        <>
            {tokError ? (
                <p className="pr-2 text-red-700">{tokError.message}</p>
            ) : (
                <p className="mr-2 w-5 h-5 rounded-[50%] bg-green-700"></p>
            )}
            <p className="pr-2">{upDate}</p>
            <ArrowPathIcon
                className="h-8 w-8 cursor-pointer hover:animate-spin"
                onClick={() => setRefresh(true)}
            />
        </>
    );
};
