import { createProject, getProjects } from "@/utlis/project";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const token = req.cookies.get("token")?.value || "";
  const data = await createProject(body, token);
  if (!data.status) {
    return NextResponse.json({
      status: false,
      error: "Failed to create project. Please try again.",
    });
  }
  return NextResponse.json({
    status: true,
  });
};
export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value || "";
  const data = await getProjects(token);
  if (!data.status) {
    return NextResponse.json({
      status: false,
      error: "Failed to get projects. Please try again.",
    });
  }
  return NextResponse.json({
    status: true,
    data: data.data,
  });
};
