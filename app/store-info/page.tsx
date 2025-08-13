"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Check } from "lucide-react"

export default function StoreInfoPage() {
  const [info, setInfo] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
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
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!info.trim()) {
      toast({
        title: "Please enter some information",
        description: "The information field cannot be empty.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/store-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          info: info.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save information")
      }

      setShowSuccess(true)
      setInfo("")

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Information saved successfully!",
        description: "Your information has been stored securely.",
      })
    } catch (error) {
      toast({
        title: "Error saving information",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/chat")}
            variant="ghost"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chatbot</span>
          </Button>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Store Information</CardTitle>
            <p className="text-gray-600 mt-2">
              Save important details, contacts, events, or anything you want to remember
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Textarea */}
              <div>
                <label htmlFor="info" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter any information you want to store
                </label>
                <Textarea
                  id="info"
                  placeholder="Type your important information here... 

Examples:
• Doctor appointment on March 15th at 2 PM
• Mom's birthday is June 12th
• Emergency contact: John Smith - (555) 123-4567
• Favorite restaurant: Luigi's Italian on Main Street"
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className="min-h-48 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Save Button */}
              <Button
                type="submit"
                disabled={!info.trim() || isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Save Information</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Information saved successfully!</p>
                  <p className="text-sm text-green-700">You can now ask MindMate about this information anytime.</p>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-medium text-blue-900 mb-2">Tips for storing information:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific with dates and times</li>
                <li>• Include contact details when relevant</li>
                <li>• Add context to help you remember later</li>
                <li>• You can store multiple pieces of information at once</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
