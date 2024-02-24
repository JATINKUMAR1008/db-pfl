import Button from "@/components/button";
import Input from "@/components/commons/input";
import Label from "@/components/commons/label";
import Image from "next/image";
import Link from "next/link";
import RegForm from "../../../components/forms/form";

export default function RegisterPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-blue-950">
      <div className="flex flex-row items-center justify-between px-10 py-3">
        <div className="flex flex-row items-center h-full gap-2">
          <h1 className="text-4xl text-black -skew-x-12 bg-white rounded-md py-1 px-2 font-montserrat uppercase italic font-[900]">
            Qd.
          </h1>
          <span className="flex flex-col text-sm font-semibold capitalize text-white ">
            <p>quick</p>
            <p>database solution</p>
          </span>
        </div>
      </div>
      <div className=" bg-white rounded-md shadow-md grid grid-cols-1  justify-center px-2 py-4 text-black">
        <div className="w-full h-full flex flex-col items-center py-2 px-3 col-span-1">
          <h1 className="text-3xl font-[900] font-montserrat uppercase ">
            register
          </h1>
          <p className="text-sm font-light capitalize font-poppins max-w-md text-center">
            create your account for crating new managed clusters with regular
            healt checks notification.
          </p>
          <div className="max-w-md w-full mt-4">
            <RegForm />
          </div>
        </div>
      </div>
    </div>
  );
}
