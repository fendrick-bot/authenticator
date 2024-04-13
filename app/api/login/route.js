import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userdbmodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    // getting user details
    const reqBody = await request.json();
    const {email, password} = reqBody

    // checking user is exists
    const user = await User.findOne({email})
    if( !user){
        return NextResponse.json({error: "user doesnot exist"}, {status: 400})
    }
    // matching password
    const validPassword = await bcryptjs.compare(password, user.password);

    if(!validPassword){
        return NextResponse.json({
            error:"Invalid password"
        },{status:400})
    }

    //creating token data
    const tokenData = {
        id:user._id,
        username: user.username,
        email: user.email
    }
    //create token
    const token = await jwt.sign(tokenData,  process.env.TOKEN_SECRET, {expiresIn: "1d"});
    
    
    const response = NextResponse.json({
        message: "Login Success",
        success: true,
    })
    // saving login cookie in browser
    response.cookies.set("token", token, {httpOnly: true})

    return response;
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
