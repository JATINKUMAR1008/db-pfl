"use client";
import Button from "@/components/button";
import GoogleLoginButton from "@/components/commons/google.login";
import Input from "@/components/commons/input";

import Label from "@/components/commons/label";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export default function LoginForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());
      console.log(data);
      if (data.status) {
        toast.success("Login successfully");
        router.push("/home");
      } else {
        toast.error(data.error);
      }
    },
  });
  return (
    <div className="w-full h-full">
      <form className="flex flex-col gap-2 p-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-start gap-1">
          <Label className="text-lg font-semibold">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-xs text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label className="text-lg font-semibold">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-xs text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className=" flex flex-row items-center justify-between">
          <span className="flex flex-row items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              name="remember"
            />
            <p className="text-sm">Remember me</p>
          </span>
          <p className="text-blue-700 capitalize hover:underline text-sm">
            forgot password ?
          </p>
        </div>
        <Button type="submit" className="mt-2 py-3 rounded-sm">
          Submit
        </Button>
        <div className=" flex flex-row items-center justify-center gap-4 mt-4">
          <hr className="w-full h-[1px] border-gray-300" />
          <p className="text-md text-gray-600 uppercase">or</p>
          <hr className="w-full h-[1px] border-gray-300" />
        </div>

        <GoogleLoginButton formType="signin" />

        <div className="w-full text-center mt-1">
          <p className="text-sm">
            Don{"'"}t have an account ?{" "}
            <Link
              href="/auth/register"
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
