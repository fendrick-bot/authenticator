import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userdbmodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    // getting user details
    const reqBody = await request.json();
    const {username , email, password} = reqBody

    // checking user is exists
    const user = await User.findOne({email})
    if( user){
        return NextResponse.json({error: "user already exist"}, {status: 400})
    }
    // hashing password
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    // creating a new user with given data
    const newRegister = new User({
        username, email, password:encryptedPassword
    });

    // saving the user in the database
    const registerResponse =  await newRegister.save()


    // return response
    return NextResponse.json({
        message:"Registration successful",
        success: true,
        registerResponse
    })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
