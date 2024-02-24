"use client";
import Label from "@/components/commons/label";
import Input from "@/components/commons/input";
import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/commons/google.login";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function RegForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values): Promise<void> => {
      console.log(values);
      const data = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());
      console.log(data);
      if (!data.status) {
        toast.error("Something went wrong");
      }
      toast.success("Account created successfully");
      router.push("/home");
    },
  });

  return (
    <div className="w-full h-full">
      <form className="flex flex-col gap-2 p-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-start gap-1">
          <Label className="text-lg font-semibold">Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="text-xs text-red-600">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label className="text-lg font-semibold">Email</Label>
          <Input
            type="email"
            placeholder="Enter your Email"
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
        <Button type="submit" className="mt-2 py-3 rounded-sm">
          Submit
        </Button>
        <div className=" flex flex-row items-center justify-center gap-4 mt-4">
          <hr className="w-full h-[1px] border-gray-300" />
          <p className="text-md text-gray-600 uppercase">or</p>
          <hr className="w-full h-[1px] border-gray-300" />
        </div>

        <GoogleLoginButton formType="signup" />

        <div className="w-full text-center mt-1">
          <p className="text-sm">
            already have an account ?{" "}
            <Link
              href="/auth/login"
              className="text-blue-700 hover:underline cursor-pointer capitalize"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
