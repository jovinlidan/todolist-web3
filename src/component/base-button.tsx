import LoadingCircleSVG from "@/asset/svg/loading-circle.svg";
import { cn } from "@/lib/utils";
import React from "react";

export interface BaseButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  loadingChildren?: React.ReactNode;
}

export default function BaseButton(props: BaseButtonProps) {
  const {
    children,
    className,
    loading = false,
    loadingChildren,
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      className={cn(
        "flex-no-shrink p-2 border-2 rounded hover:opacity-50 text-green border-green hover:bg-green disabled:opacity-50 disabled:touch-none flex justify-center",
        className
      )}
    >
      {loading && !!loadingChildren ? loadingChildren : children}
      {loading && <LoadingCircleSVG className="ml-2" width={20} height={20} />}
    </button>
  );
}
