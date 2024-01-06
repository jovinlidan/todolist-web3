import LoadingCircleSVG from "@/asset/svg/loading-circle.svg";
import BaseButton from "@/component/base-button";
import { todolistContract } from "@/contract/sepolia/todolist";
import { maskAddress, waitForTx } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";

interface Props {
  isCompleted?: boolean;
  id: number;
}
export default function DoneButton(props: Props) {
  const { isCompleted = false, id } = props;
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMarkDoneUndone = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await writeContractAsync({
        abi: todolistContract.abi,
        address: `0x${todolistContract.address}`,
        functionName: isCompleted ? "markTodoUndone" : "markTodoDone",
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
  }, [address, id, isCompleted, writeContractAsync]);
  return (
    <div className="flex items-center mr-4">
      {isLoading ? (
        <>
          <LoadingCircleSVG width={20} height={20} />
        </>
      ) : (
        <input
          type="checkbox"
          onChange={handleMarkDoneUndone}
          checked={isCompleted}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
      )}
    </div>
  );
}
