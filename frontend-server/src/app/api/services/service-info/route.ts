import { createService, getService } from "@/utlis/project";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const token = req.cookies.get("token")?.value || "";
  const data = await getService(token, body.name, body.serviceType);
  console.log(data);
  if (!data.status) {
    return NextResponse.json({
      status: false,
      error: data.error,
    });
  }
  return NextResponse.json({
    status: true,
    data,
  });
};
