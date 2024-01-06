import React from "react";
import ListItems from "./components/list-items";
import ConnectButton from "@/component/connect-button";
import TodoInput from "./components/todo-input";

export default function HomePage() {
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <ConnectButton className="bg-white w-full mx-auto" />
        <TodoInput />
        <ListItems />
      </div>
    </div>
  );
}
