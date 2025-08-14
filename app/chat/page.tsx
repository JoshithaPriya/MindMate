"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("mindmate-username")
    if (!storedUsername) {
      router.push("/login")
      return
    }
    setUsername(storedUsername)

    // Add welcome message
    setMessages([
      {
        id: "welcome",
        text: `Hello ${storedUsername}! I'm MindMate, your friendly memory companion. How can I help you today?`,
        isUser: false,
        timestamp: new Date(),
      },
    ])
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim() || isLoading) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputValue.trim(),
    isUser: true,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/generatePatientDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage.text, id: localStorage.getItem("mindmate-username") }),
    });

    const data = await response.json();
    const botText = data.response || "I'm sorry, I couldn't process that request.";

    // Create a new message with empty text
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);

    // Append characters one by one
    for (let i = 0; i < botText.length; i++) {
      await new Promise((r) => setTimeout(r, 30)); // adjust typing speed here
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessage.id ? { ...m, text: m.text + botText[i] } : m
        )
      );
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Sticky Blue Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold text-white">MindMate</h1>
          </div>
          <Button
            onClick={() => router.push("/store-info")}
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-0 font-medium"
          >
            Store Information
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-xs md:max-w-md px-4 py-3 ${
                message.isUser
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0"
                  : "bg-white border shadow-sm"
              }`}
            >
              <p className={`text-sm md:text-base ${message.isUser ? "text-white" : "text-gray-800"}`}>
                {message.text}
              </p>
              <p className={`text-xs mt-2 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-xs md:max-w-md px-4 py-3 bg-white border shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-sm text-gray-500">MindMate is thinking...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Area */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg px-4 py-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-base"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
