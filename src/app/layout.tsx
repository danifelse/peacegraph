import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peacegraph",
  description: "Solusi percetakan digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <StoreProvider>
          <body className={inter.className}>
            {children}
            <div></div>
          </body>
        </StoreProvider>
      </Providers>
    </html>
  );
}
