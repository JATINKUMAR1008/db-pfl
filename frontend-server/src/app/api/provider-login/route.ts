import { createGoogleUser } from "@/utlis/auth";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  console.log(JSON.stringify(body));
  const data = await createGoogleUser(body);
  if (!data.status) {
    return NextResponse.json({
      status: false,
      error: "Invliad credentials. Please try again.",
    });
  }
  const serialized = serialize("token", data.token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  return new NextResponse(
    JSON.stringify({
      status: true,
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
};
