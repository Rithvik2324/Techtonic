"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Import AudioPlayer component with SSR disabled
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
    const checkAudioSupport = () => {
      try {
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
      {isMounted && audioEnabled && (
        <div className="fixed bottom-4 right-4 z-50">
          <AudioPlayer src="/chiptune.mp3" volume={0.3} loop={true} />
        </div>
      )}
      {children}
    </div>
  )
}
