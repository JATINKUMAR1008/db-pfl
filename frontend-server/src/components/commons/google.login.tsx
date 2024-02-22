import { useGoogleLogin } from "@react-oauth/google";
import Button from "../button";
import Image from "next/image";
import { verifyToken } from "@/utlis/verify-token";
import { getGoogleAuthData } from "@/utlis/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
interface IProps {
  formType?: "signin" | "signup";
}
export default function GoogleLoginButton({ formType }: IProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: async (user) => {
      setLoading(true);
      try {
        const res = await getGoogleAuthData(user.access_token);
        const data = await fetch("/api/provider-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        }).then((res) => res.json());
        if (data.status) {
          router.push("/home");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    },
  });
  return (
    <Button
      className="flex flex-row items-center border border-gray-600 bg-transparent py-2 justify-center rounded-sm gap-2"
      type="button"
      onClick={login}
    >
      {!loading ? (
        <>
          <Image
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            className="w-5 h-5 mr-2"
            alt="google logo"
            width={30}
            height={30}
          />
          <p className="text-md text-gray-600 uppercase">
            {formType === "signup"
              ? `sign up with google`
              : `sign in with google`}
          </p>
        </>
      ) : (
        <div className="w-5 h-5 text-black">
          <LuLoader2 className="animate-spin" size={20} />
        </div>
      )}
    </Button>
  );
}
