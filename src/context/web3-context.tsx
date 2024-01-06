"use client";

import { WagmiProvider } from "wagmi";
import type { PropsWithChildren } from "react";
import { wagmiConfig } from "@/common/wagmi-config";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/common/query-client";

function Web3Context({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3Context;
