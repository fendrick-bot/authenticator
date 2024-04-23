import { sendEmail } from "@/helper/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
sendEmail;

connect();
export async function POST(request, verificationType) {
  try {
    if( verificationType == "VERIFY"){
      const reqBody = await request.json();
      const { email, id } = reqBody;
      console.log(email , id);
      await sendEmail({
        email,
        verificationType: "VERIFY",
        userId: id,
      });
    }
    return NextResponse.json({
      message: "mail sent successfull",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
