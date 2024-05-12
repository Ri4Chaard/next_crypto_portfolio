"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { useLocale } from "use-intl";

export const LocalSwitcher = () => {
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
        <label>
            <p className="sr-only">Change lang</p>
            <select defaultValue={localActive} onChange={changeLang}>
                <option value="en">English</option>
                <option value="uk">Ukrainian</option>
            </select>
        </label>
    );
};
