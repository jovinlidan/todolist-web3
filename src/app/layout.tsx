import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Web3Context from "@/context/web3-context";
import ToastContainer from "@/component/container/toast.container";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "TodoList Web3",
  description: "TodoList Web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastContainer />
        <Web3Context>{children}</Web3Context>
      </body>
    </html>
  );
}
