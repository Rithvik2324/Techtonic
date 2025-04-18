"use client"

import { useEffect, useState } from "react"

// Export a hook to use the button sound
export function useButtonSound(src: string, volume?: number) {
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(true)

  // Check if audio file exists
  useEffect(() => {
    // Function to check if file exists
    const checkFileExists = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" })
        return response.ok
      } catch (error) {
        console.error("Error checking audio file:", error)
        return false
      }
    }

    // Check if audio file exists
    checkFileExists(src).then((exists) => {
      if (!exists) {
        console.warn(`Audio file not found: ${src}`)
        setAudioAvailable(false)
        setIsError(true)
      }
    })
  }, [src])

  // We'll use a simple approach without actual audio for button sounds
  // This ensures the UI remains responsive even if audio fails
  const playSound = () => {
    // If audio isn't available, just return without trying to play
    if (!audioAvailable || isError) return

    try {
      // Create a temporary audio element just for this sound
      const audio = new Audio(src)
      audio.volume = volume || 0.2

      // Play the sound and forget about it
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Button sound play failed:", error)
          setIsError(true)
        })
      }
    } catch (error) {
      console.warn("Button sound play error:", error)
      setIsError(true)
    }
  }

  return {
    playSound,
    isError,
    isLoaded: audioAvailable && !isError,
  }
}
