"use client";

import React, { useCallback, useState, useMemo } from "react";
import BaseButton, { type BaseButtonProps } from "./base-button";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import LoadingCircleSVG from "@/asset/svg/loading-circle.svg";
import { sepolia } from "viem/chains";
import { injected } from "wagmi/connectors";
import toast from "react-hot-toast";
import { maskAddress } from "@/lib/utils";

interface Props extends Omit<BaseButtonProps, "loading" | "loadingChildren"> {}
export default function ConnectButton(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const handleConnectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      await connectAsync({
        connector: injected(),
        chainId: sepolia.id,
      });
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [connectAsync]);

  const handleDisconnectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      await disconnectAsync();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [disconnectAsync]);

  const maskedAddress = useMemo(() => {
    return maskAddress(address);
  }, [address]);

  const formatedBalance = useMemo(() => {
    if (balance?.value) {
      return (
        parseFloat(balance.value.toString()) /
        parseFloat(Math.pow(10, balance.decimals).toString())
      )
        .toString()
        .slice(0, 4);
    }
  }, [balance?.decimals, balance?.value]);

  if (address) {
    return (
      <BaseButton
        {...props}
        disabled={isLoading}
        onClick={handleDisconnectWallet}
        loading={isLoading}
        loadingChildren={<>Disconnecting...</>}
      >
        {`Disconnect ${maskedAddress} (${formatedBalance} ${balance?.symbol})`}
      </BaseButton>
    );
  }
  return (
    <BaseButton
      {...props}
      disabled={isLoading}
      onClick={handleConnectWallet}
      loading={isLoading}
      loadingChildren={<>Connecting...</>}
    >
      Connect to wallet
    </BaseButton>
  );
}
