import { loginUser } from "@/utlis/auth";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  console.log(JSON.stringify(body));
  const data = await loginUser(body);
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
  const not_remember = serialize("token", data.token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
  if (!body.remember) {
    return new NextResponse(JSON.stringify({ status: true }), {
      status: 200,
      headers: {
        "Set-Cookie": not_remember,
      },
    });
  }
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
export const GET = () => {
  return NextResponse.json({
    status: "OK",
  });
};
