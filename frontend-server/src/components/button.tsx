import { twMerge } from "tailwind-merge";

interface IProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick: () => void;
  className: string;
}

export default function Button({ children, type, onClick, className }: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge("p-1 bg-blue-950 text-white font-semibold", className)}
    >
      {children}
    </button>
  );
}
