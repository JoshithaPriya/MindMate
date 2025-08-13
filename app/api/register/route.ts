import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  connectToDB from "../../mongodb/connect"; // your DB connection
import User from "../../mongodb/schema"; 

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, code: "MISSING_FIELDS", message: "Name and password are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingUser = await User.findOne({ name:username });

    if (existingUser) {
      return NextResponse.json(
        { success: true, code: "USER_EXISTS", message: "Account already exists. Please log in." },
        { status: 200 } // Not an error — just an info response
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name:username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, code: "USER_CREATED", message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "Internal server error" },
      { status: 500 }
    );
  }
}