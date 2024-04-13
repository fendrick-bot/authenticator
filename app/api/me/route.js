import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userdbmodel";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helper/getTokenData";

connect();

export async function GET(request) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "user found", user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
