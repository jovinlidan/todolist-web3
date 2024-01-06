"use client";
import React from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { todolistContract } from "@/contract/sepolia/todolist";
import Item, { ItemProps } from "./item";
import useWatchAllEvent from "@/hooks/use-watch-all-event";
export default function ListItems() {
  const { address } = useAccount();

  const res = useReadContract<
    typeof todolistContract.abi,
    string,
    any,
    any,
    ItemProps[]
  >({
    abi: todolistContract.abi,
    address: `0x${todolistContract.address}`,
    functionName: "getTodos",
    account: address,
    scopeKey: "getTodos",
  });

  useWatchAllEvent({
    address,
    onLogs(logs) {
      //@ts-ignore
      if (logs?.[0]?.args?.owner === address) {
        // to check if event trigger was from this owner then refetch it list
        res.refetch();
      }
      console.log("New logs!", logs);
    },
  });

  if (!address) return null;
  return (
    <div>
      {res?.data
        ?.sort(
          (a, b) => parseInt(a.date.toString()) - parseInt(b.date.toString())
        )
        .map((item) => (
          <Item {...item} key={item.date} />
        ))}
    </div>
  );
}
