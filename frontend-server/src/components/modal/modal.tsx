import { RxCross2 } from "react-icons/rx";
interface IProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  onClose?: () => void;
}
export default function ModalBox({
  children,
  className,
  onClose,
  title,
  description,
}: IProps) {
  return (
    <div className="z-20 bg-[rgba(109,93,250,0.5)] flex items-center justify-center fixed top-0 left-0 w-screen h-screen ">
      <div className="bg-white shadow-md w-[500px] py-3 px-5 relative rounded-md">
        <div className="flex flex-col items-start w-full gap-1 mb-2">
          {title && (
            <h1 className="text-xl font-semibold text-gray-500">{title}</h1>
          )}
          {description && (
            <p className="text-md text-blue-700">{description}</p>
          )}
        </div>
        {children}
        <div
          className="absolute right-4 top-4 cursor-pointer text-gray-700 font-extrabold"
          onClick={onClose}
        >
          <RxCross2 size={20} />
        </div>
      </div>
    </div>
  );
}
