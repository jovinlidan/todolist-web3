import BaseButton from "@/component/base-button";
import { todolistContract } from "@/contract/sepolia/todolist";
import { maskAddress, waitForTx } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";

interface Props {
  id: number;
}
export default function RemoveButton(props: Props) {
  const { id } = props;
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await writeContractAsync({
        abi: todolistContract.abi,
        address: `0x${todolistContract.address}`,
        functionName: "removeTodo",
        args: [id],
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
  }, [address, id, writeContractAsync]);
  return (
    <BaseButton loading={isLoading} onClick={handleRemoveTodo}>
      Remove
    </BaseButton>
  );
}
