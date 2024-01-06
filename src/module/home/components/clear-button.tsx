"use client";
import BaseButton from "@/component/base-button";
import { todolistContract } from "@/contract/sepolia/todolist";
import { maskAddress, waitForTx } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";

interface Props {}
export default function ClearButton(props: Props) {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClear = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await writeContractAsync({
        abi: todolistContract.abi,
        address: `0x${todolistContract.address}`,
        functionName: "clearTodo",
        args: [],
        account: address,
      });
      toast.promise(waitForTx(res), {
        loading: "Sending Transaction...",
        success: `Tx: ${maskAddress(res)} Finished!`,
        error: "Something went wrong",
      });
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContractAsync]);
  if (!address) return null;

  return (
    <div className="flex items-center ml-2">
      <BaseButton loading={isLoading} onClick={handleClear}>
        Clear All
      </BaseButton>
    </div>
  );
}
