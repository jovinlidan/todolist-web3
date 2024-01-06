"use client";
import BaseButton from "@/component/base-button";
import { todolistContract } from "@/contract/sepolia/todolist";
import { maskAddress, waitForTx } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";

interface Props {
  id?: number;
  message?: string;
  date?: number;
  onSuccess?: () => void;
}
export default function TodoInput(props: Props) {
  const { id, message = "", onSuccess, date } = props;
  const { address } = useAccount();
  const [value, setValue] = useState<string>(message);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();

  const handleChangeTodo = useCallback(async () => {
    let args = [value, id ? date : Date.now(), false];
    if (id) {
      args.push(id);
    }
    try {
      setButtonLoading(true);
      const res = await writeContractAsync({
        abi: todolistContract.abi,
        address: `0x${todolistContract.address}`,
        functionName: id ? "updateTodo" : "storeTodo",
        args,
        account: address,
      });
      setValue("");
      onSuccess?.();
      toast.promise(waitForTx(res), {
        loading: "Sending Transaction...",
        success: `Tx: ${maskAddress(res)} Finished!`,
        error: "Something went wrong",
      });
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setButtonLoading(false);
    }
  }, [address, date, id, onSuccess, value, writeContractAsync]);

  const onEnterKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleChangeTodo();
      }
    },
    [handleChangeTodo]
  );

  if (!address) return null;
  return (
    <div className="mb-4">
      <div className="flex mt-4 w-full">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker "
          placeholder={id ? "Update Todo" : "Add Todo"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          disabled={buttonLoading}
          onKeyDown={onEnterKeyDown}
        />
        <BaseButton onClick={handleChangeTodo} loading={buttonLoading}>
          {id ? "Edit" : "Add"}
        </BaseButton>
      </div>
    </div>
  );
}
