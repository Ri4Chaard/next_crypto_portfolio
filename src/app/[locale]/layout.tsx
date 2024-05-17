import type { Metadata } from "next";
import { TokensProvider } from "@/components/TokensProvider";
import { HeaderNavbar } from "@/components/HeaderNavbar";
import { MarketData } from "@/components/MarketData";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata: Metadata = {
    title: "Etherfolio",
    description: "App for tracking your crypto-wallets",
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const messages = useMessages();
    return (
        <html lang={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className="min-h-screen flex flex-col bg-slate-900 text-white">
                    <TokensProvider>
                        <header>
                            <HeaderNavbar />
                            <MarketData />
                        </header>
                        <main className="w-full flex flex-col flex-grow flex-shrink-0 ">
                            {children}
                        </main>
                    </TokensProvider>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
