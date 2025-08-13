import { type NextRequest, NextResponse } from "next/server"

// In-memory store (same as store-info API)
const userInfoStore: Record<string, string[]> = {}

export async function POST(request: NextRequest) {
  try {
    const { message, username } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const lowerMessage = message.toLowerCase()
    const userInfo = userInfoStore[username] || []

    let response = ""

    // Handle greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = `Hello ${username}! How can I help you remember something today?`
    }
    // Handle information queries
    else if (
      lowerMessage.includes("what") ||
      lowerMessage.includes("when") ||
      lowerMessage.includes("who") ||
      lowerMessage.includes("where") ||
      lowerMessage.includes("remind me") ||
      lowerMessage.includes("tell me about")
    ) {
      if (userInfo.length === 0) {
        response =
          "I don't have any stored information for you yet. You can use the 'Store Information' button to save important details!"
      } else {
        // Search through stored information for relevant matches
        const searchTerms = lowerMessage.split(" ").filter((term) => term.length > 2)
        const relevantInfo = userInfo.filter((info) => searchTerms.some((term) => info.toLowerCase().includes(term)))

        if (relevantInfo.length > 0) {
          response = `Here's what I found:\n\n${relevantInfo.slice(0, 3).join("\n\n")}`
          if (relevantInfo.length > 3) {
            response += `\n\n...and ${relevantInfo.length - 3} more items. Try being more specific!`
          }
        } else {
          response = `I couldn't find specific information about that. Here's what I have stored for you:\n\n${userInfo.slice(-2).join("\n\n")}`
        }
      }
    }
    // Handle storage-related queries
    else if (lowerMessage.includes("remember") || lowerMessage.includes("store") || lowerMessage.includes("save")) {
      response =
        "I'd be happy to help you remember that! You can use the 'Store Information' button at the top to save important details, or just tell me what you'd like to remember and I'll guide you."
    }
    // Handle forgetting/memory issues
    else if (
      lowerMessage.includes("forget") ||
      lowerMessage.includes("forgot") ||
      lowerMessage.includes("can't remember")
    ) {
      if (userInfo.length > 0) {
        response = `Don't worry! Let me help you remember. Here are your recent stored items:\n\n${userInfo.slice(-2).join("\n\n")}\n\nIs this what you were looking for?`
      } else {
        response =
          "Don't worry about forgetting - that's what I'm here for! Start by storing some important information using the 'Store Information' button."
      }
    }
    // Handle information listing
    else if (lowerMessage.includes("list") || lowerMessage.includes("show me") || lowerMessage.includes("all")) {
      if (userInfo.length === 0) {
        response = "You haven't stored any information yet. Use the 'Store Information' button to get started!"
      } else {
        response = `Here's everything I have stored for you:\n\n${userInfo.join("\n\n")}`
        if (userInfo.length > 5) {
          response = `You have ${userInfo.length} stored items. Here are the most recent ones:\n\n${userInfo.slice(-5).join("\n\n")}`
        }
      }
    }
    // Handle thanks
    else if (lowerMessage.includes("thank")) {
      response = "You're very welcome! I'm always here to help you remember what matters most."
    }
    // Handle help requests
    else if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      response =
        "I can help you remember important information! Here's what I can do:\n\n• Store information using the 'Store Information' button\n• Answer questions about what you've stored\n• Remind you of important details\n• Search through your saved information\n\nJust ask me questions like 'What's my doctor's appointment?' or 'When is mom's birthday?'"
    }
    // Default responses with context
    else {
      const responses = [
        "That's interesting! I'll help you remember that.",
        "I understand. Let me store that information for you.",
        "Thanks for sharing that with me. I'll keep it in mind.",
        "Got it! I'm here to help you remember what matters.",
        "That's important information. I'll make sure to remember it.",
        "I'm listening and learning about what's important to you.",
        "Thank you for trusting me with that information.",
        "I'll help you keep track of that. Feel free to ask me about it anytime!",
      ]
      response = responses[Math.floor(Math.random() * responses.length)]
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      hasStoredInfo: userInfo.length > 0,
      storedItemsCount: userInfo.length,
    })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
