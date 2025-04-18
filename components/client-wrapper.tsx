"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Import RetroElements with SSR disabled to avoid window reference issues
const RetroElements = dynamic(
  () => import("@/components/retro-elements").then((mod) => ({ default: mod.RetroElements })),
  { ssr: false },
)

// Import AudioPlayer component
const AudioPlayer = dynamic(() => import("./audio-player"), { ssr: false })

interface ClientWrapperProps {
  children: ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    // Check if audio should be enabled
    // This could be based on user preferences, browser capabilities, etc.
    const checkAudioSupport = () => {
      try {
        // Simple check if Audio API is available
        if (typeof Audio !== "undefined") {
          const audio = new Audio()
          return true
        }
      } catch (e) {
        console.warn("Audio not supported in this environment")
      }
      return false
    }

    setAudioEnabled(checkAudioSupport())
  }, [])

  return (
    <div className="relative">
      {/* Only render client components after mounting */}
      {isMounted && (
        <>
          <RetroElements />
          {audioEnabled && (
            <div className="fixed bottom-4 right-4 z-50">
              <AudioPlayer src="/chiptune.mp3" volume={0.3} loop={true} />
            </div>
          )}
        </>
      )}
      {children}
    </div>
  )
}
