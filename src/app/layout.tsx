import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/nullstyle.css";
import { TokensProvider } from "@/components/TokensProvider";
import { HeaderNavbar } from "@/components/HeaderNavbar";
import { MarketData } from "@/components/MarketData";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
        </html>
    );
}
