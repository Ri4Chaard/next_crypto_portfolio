"use client";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { useLocale } from "use-intl";

export const LocalSwitcher = () => {
    const t = useTranslations("Header");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();

    const localActive = useLocale();

    const changeLang = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(
                `/${nextLocale}/${pathname.slice(3, pathname.length)}`
            );
        });
    };
    return (
        <div className="ml-2 font-normal flex items-center ">
            <GlobeAltIcon className="w-5 h-5 text-cyan-600 mr-1" />
            <select
                defaultValue={localActive}
                onChange={changeLang}
                className="bg-slate-900 border border-solid border-cyan-600 rounded"
            >
                <option value="en">{t("en")}</option>
                <option value="uk">{t("uk")}</option>
            </select>
        </div>
    );
};
