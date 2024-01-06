import { cn } from "@/lib/utils";
import React from "react";
import DoneButton from "./done-button";
import RemoveButton from "./remove-button";
import EditButton from "./edit-button";

export type ItemProps = {
  id: number;
  isCompleted: boolean;
  date: number;
  message: string;
};
export default function Item(props: ItemProps) {
  const { id, date, isCompleted, message } = props;

  return (
    <div className="flex mb-4 items-center">
      <DoneButton isCompleted={isCompleted} id={id} />
      <p
        className={cn(
          "w-full",
          isCompleted ? "text-green line-through" : "text-green-900"
        )}
      >
        {message}
      </p>
      <EditButton message={message} id={id} date={date} />
      <RemoveButton id={id} />
    </div>
  );
}
