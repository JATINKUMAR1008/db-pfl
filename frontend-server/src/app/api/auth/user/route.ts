import { getUserData } from "@/utlis/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const data = await getUserData(req.cookies.get("token")?.value || "");
  if (!data.status) {
    return NextResponse.json({
      status: false,
      error: "Invalid token. Please login again.",
    });
  } else {
    return NextResponse.json({
      status: true,
      data: data.data,
    });
  }
};
