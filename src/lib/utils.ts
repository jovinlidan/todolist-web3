import { wagmiConfig } from "@/common/wagmi-config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { waitForTransactionReceipt } from "wagmi/actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskAddress(address?: `0x${string}`) {
  if (address) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }
  return address;
}
export async function waitForTx(tx: `0x${string}`) {
  const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
    hash: tx,
    timeout: 300000,
  });
}
