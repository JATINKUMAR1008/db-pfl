import { createService } from "@/utlis/project";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const token = req.cookies.get("token")?.value || "";
  const data = await createService(body, token);
  if (!data.status) {
    return NextResponse.json({
      status: false,
      error: data.error,
    });
  }
  return NextResponse.json({
    status: true,
    message: "Service created successfully",
  });
};