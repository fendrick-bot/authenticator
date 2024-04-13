import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "logout success",
      success: true,
    });
    cookies().delete('token');
    response.cookies.delete('token');
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
