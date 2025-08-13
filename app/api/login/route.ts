import { NextResponse } from "next/server";
import  connectToDB from "../../mongodb/connect"; // your DB connection
import User from "../../mongodb/schema"; // your mongoose model
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    await connectToDB();

    const user = await User.findOne({ name: username });
    if (!user) {
      return NextResponse.json({ success: false });
    }

    const isValid = await bcrypt.compare(password, user.password);
    return NextResponse.json({ success: isValid });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


