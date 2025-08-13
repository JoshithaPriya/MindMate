import { type NextRequest, NextResponse } from "next/server"

// In a real app, you'd store this in a database
// For now, we'll use an in-memory store
const userInfoStore: Record<string, string[]> = {}

export async function POST(request: NextRequest) {
  try {
    const { username, info } = await request.json()

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    if (!info || typeof info !== "string" || info.trim().length === 0) {
      return NextResponse.json({ error: "Information is required" }, { status: 400 })
    }

    const trimmedInfo = info.trim()
    const trimmedUsername = username.trim()

    // Initialize user's info array if it doesn't exist
    if (!userInfoStore[trimmedUsername]) {
      userInfoStore[trimmedUsername] = []
    }

    // Add the new information with timestamp
    const timestampedInfo = `[${new Date().toLocaleString()}] ${trimmedInfo}`
    userInfoStore[trimmedUsername].push(timestampedInfo)

    // Log for debugging (in a real app, you'd save to database)
    console.log(`Stored info for ${trimmedUsername}:`, timestampedInfo)

    return NextResponse.json({
      success: true,
      message: "Information stored successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Store info API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET endpoint to retrieve stored information (for future use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const userInfo = userInfoStore[username] || []

    return NextResponse.json({
      username,
      information: userInfo,
      count: userInfo.length,
    })
  } catch (error) {
    console.error("Get info API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
