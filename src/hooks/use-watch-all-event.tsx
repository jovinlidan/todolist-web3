import { todolistContract } from "@/contract/sepolia/todolist";
import React from "react";
import { Log } from "viem";
import { useWatchContractEvent } from "wagmi";

interface Props {
  address?: `0x${string}`;
  onLogs: (logs: Log[]) => void;
}
export default function useWatchAllEvent({ address, onLogs }: Props) {
  useWatchContractEvent({
    address: `0x${todolistContract.address}`,
    abi: todolistContract.abi,
    eventName: "TodoStore",
    enabled: !!address,
    onLogs,
  });
  useWatchContractEvent({
    address: `0x${todolistContract.address}`,
    abi: todolistContract.abi,
    eventName: "TodoUpdate",
    enabled: !!address,
    onLogs,
  });
  useWatchContractEvent({
    address: `0x${todolistContract.address}`,
    abi: todolistContract.abi,
    eventName: "TodoClear",
    enabled: !!address,
    onLogs,
  });
  useWatchContractEvent({
    address: `0x${todolistContract.address}`,
    abi: todolistContract.abi,
    eventName: "TodoRemove",
    enabled: !!address,
    onLogs,
  });
  return;
}
