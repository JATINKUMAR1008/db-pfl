import { registerUser } from "@/utlis/auth";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import { serialize } from "cookie";
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(JSON.stringify(body));
  const data = await registerUser(body);
  if (!data) {
    return NextResponse.json({
      status: "unsuccessfull",
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
