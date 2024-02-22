import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as Tl } from "react-tooltip";
interface IProps {
  children: React.ReactNode;
  value: string;
}
export default function ToolTip({ children, value }: IProps) {
  return (
    <>
      <div className={value[0]}>{children}</div>
      <Tl
        anchorSelect={`.${value[0]}`}
        content={value}
        place="bottom-end"
        className="text-xs opacity-70"
      />
    </>
  );
}
