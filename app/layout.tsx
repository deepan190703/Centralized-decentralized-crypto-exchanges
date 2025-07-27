import type { Metadata } from "next";
import "./globals.css";
import { Appbar } from "./components/Appbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CryptoExchange Pro - Advanced Cryptocurrency Trading Platform",
  description: "Professional cryptocurrency exchange with advanced trading features, real-time market data, and secure wallet management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <Appbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
