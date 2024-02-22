import { twMerge } from "tailwind-merge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface IProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  type,
  onClick,
  className,
  isLoading,
}: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        "p-1 bg-[#3545BE] text-white font-semibold",
        className
      )}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
