import { LuLoader2 } from "react-icons/lu";
export default function LoadingPage() {
  return (
    <div className="w-screen h-screen fixed z-10 inset-0 bg-[rgba(0,0,0,.2)] flex items-center justify-center">
      <LuLoader2 size={30} className="text-white animate-spin" />
    </div>
  );
}
