"use client";
import { useRouter } from "next/navigation";

export default function ProjectHome() {
  const router = useRouter();
  router.push("/home");
  return null;
}
