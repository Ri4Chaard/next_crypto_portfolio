import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

interface WalletTokenList {
    wallet: any;
    currInfo: any;
}

export const WalletTokenList = ({ wallet, currInfo }: WalletTokenList) => {
    const t = useTranslations("Portfolio");
    return (
        <div className="w-full">
            <p className="text-2xl p-3 font-bold border-y border-solid border-slate-800">
                {t("TokenTitle")}
            </p>
            <div className="flex justify-between p-3 border-b border-solid border-slate-800 text-slate-400">
                <p className="w-1/3">{t("TokenName")}</p>
                <p className="w-1/4 text-right">{t("TokenBalance")}</p>
                <p className="w-1/4 text-right">{t("TokenPrice")}</p>
            </div>
            {wallet.tokens.map(
                (token: any) =>
                    token.balance > 0 && (
                        <div
                            className=" p-2 border-b border-solid border-slate-800 hover:bg-slate-800"
                            key={token.id}
                        >
                            <Link href={`./tokens/${token.id}`}>
                                {currInfo
                                    .filter((curr: any) => curr.id == token.id)
                                    .map((curr: any) => (
                                        <div
                                            className="text-white flex items-center justify-between"
                                            key={curr.id}
                                        >
                                            <div className="w-1/3 flex items-center">
                                                <img
                                                    className="w-12 h-12 mr-2 "
                                                    src={curr.image}
                                                />
                                                <p className="mr-2">
                                                    {curr.name}
                                                </p>
                                                <p className="font-bold">
                                                    {curr.symbol.toUpperCase()}
                                                </p>
                                            </div>
                                            <p className="px-2 w-1/4 text-right">
                                                {token.balance.toFixed(4)}
                                            </p>
                                            <p className="px-2 w-1/4 text-right">
                                                ~$
                                                {(
                                                    token.balance *
                                                    curr.current_price
                                                ).toFixed(4)}
                                            </p>
                                        </div>
                                    ))}
                            </Link>
                        </div>
                    )
            )}
        </div>
    );
};
