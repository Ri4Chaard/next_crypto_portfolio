import "../styles/globals.css";
import "../styles/nullstyle.css";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
