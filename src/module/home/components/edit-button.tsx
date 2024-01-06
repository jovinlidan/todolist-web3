import BaseButton from "@/component/base-button";
import React, { useState } from "react";
import EditModal from "./modal/edit-modal";
interface Props {
  id: number;
  date: number;
  message: string;
}

export default function EditButton(props: Props) {
  const { id, message, date } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <BaseButton
        className="mr-2"
        type="button"
        role="button"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </BaseButton>
      <EditModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={id}
        date={date}
        message={message}
      />
    </>
  );
}
