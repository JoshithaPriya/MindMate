"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function IntroPage() {
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 200)
    const timer2 = setTimeout(() => setShowTitle(true), 600)
    const timer3 = setTimeout(() => setShowSubtitle(true), 1000)
    const timer4 = setTimeout(() => setShowFeatures(true), 1400)
    const timer5 = setTimeout(() => setShowButton(true), 1800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <div
          className={`transition-all duration-1000 ${showLogo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Title */}
        <div
          className={`transition-all duration-1000 ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">MindMate</h1>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 delay-200 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            Your friendly companion to help you remember what matters.
          </p>
        </div>

        {/* Features */}
        <div
          className={`transition-all duration-1000 delay-300 ${showFeatures ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-lg text-gray-700">Easy chat interface</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-lg text-gray-700">Store important information anytime</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-lg text-gray-700">Simple and secure login</span>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div
          className={`transition-all duration-1000 delay-500 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Login
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 right-6">
        <p className="text-gray-500 text-sm">Made for you with ❤️</p>
      </div>
    </div>
  )
}
