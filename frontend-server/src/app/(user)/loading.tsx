import { LuLoader2 } from "react-icons/lu";
export default function Loading() {
  return (
    <div className="flex justify-center fixed inset-0 w-screen items-center h-screen bg-[rgba(0,0,0,.2)]">
      <LuLoader2 className="animate-spin text-5xl text-black" />
    </div>
  );
}
