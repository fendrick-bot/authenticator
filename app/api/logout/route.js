import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "logout success",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    NextResponse.json(
      {
        error: "logout failed",
      },
      { status: 500 }
    );
  }
}
