import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    endpoints: {
      login: "/api/login",
      chatbot: "/api/chatbot",
      storeInfo: "/api/store-info",
      health: "/api/health",
    },
  })
}
