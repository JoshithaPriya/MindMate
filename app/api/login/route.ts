import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || typeof username !== "string" || username.trim().length === 0) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    if (!password || typeof password !== "string" || password.trim().length === 0) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    if (password.trim().length < 4) {
      return NextResponse.json({ error: "Password must be at least 4 characters long" }, { status: 400 })
    }

    // For now, we'll just validate the username and password exist
    // In a real app, you'd verify credentials against a database
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    return NextResponse.json({
      success: true,
      username: trimmedUsername,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
