"use client";
import Navbar from "@/components/navbar/navbar";
import { AuthProvider } from "@/providers/auth-provider";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import NextTopLoader from "nextjs-toploader";
interface IProps {
  children: React.ReactNode;
}
export default function HomeLayout({ children }: IProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <NextTopLoader />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
