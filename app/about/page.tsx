"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const router = useRouter()
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = Number.parseInt(entry.target.getAttribute("data-section") || "0")
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, sectionIndex]))
          }
        })
      },
      { threshold: 0.2 },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <section
        ref={setSectionRef(0)}
        data-section="0"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6"
      >
        <div
          className={`text-center transition-all duration-1000 ${
            visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">MindMate</h1>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your friendly companion to help you remember what matters.
          </p>
        </div>
      </section>

      {/* Section 2: Feature Cards */}
      <section ref={setSectionRef(1)} data-section="1" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Everything you need to remember</h2>
            <p className="text-xl text-gray-600">Simple, powerful, and designed for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Memory Storage",
                description: "Save important contacts, events, and notes easily.",
                icon: "🧠",
                delay: "delay-200",
              },
              {
                title: "Instant Recall with Chat",
                description: "Ask MindMate and get answers immediately.",
                icon: "💬",
                delay: "delay-400",
              },
              {
                title: "Simple & Accessible",
                description: "No passwords, no complexity.",
                icon: "✨",
                delay: "delay-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 ${
                  visibleSections.has(1) ? `opacity-100 translate-y-0 ${feature.delay}` : "opacity-0 translate-y-12"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: "Is This You?" */}
      <section ref={setSectionRef(2)} data-section="2" className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Is this you?</h2>
            <p className="text-xl text-gray-600">MindMate is here to help</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                emoji: "🧠",
                text: "Forgetting important dates or names?",
                delay: "delay-100",
              },
              {
                emoji: "📱",
                text: "Want a simple way to store life's details?",
                delay: "delay-200",
              },
              {
                emoji: "💬",
                text: "Need a companion to help you remember?",
                delay: "delay-300",
              },
              {
                emoji: "❤️",
                text: "Want to feel more confident in daily life?",
                delay: "delay-400",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-md bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 ${
                  visibleSections.has(2) ? `opacity-100 translate-y-0 ${item.delay}` : "opacity-0 translate-y-12"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`text-center transition-all duration-1000 delay-500 ${
              visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <Button
              onClick={() => router.push("/chat")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Continue to Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
