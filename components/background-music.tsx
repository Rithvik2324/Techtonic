/*"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface BackgroundMusicProps {
  className?: string
}

export default function BackgroundMusic({ className = "" }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const tracks = ["/pacman-intro.mp3", "/mario-theme.mp3"]

  useEffect(() => {
    setIsMounted(true)

    // Create audio element on mount
    try {
      audioRef.current = new Audio()
      audioRef.current.src = tracks[currentTrack]
      audioRef.current.volume = 0.3
      audioRef.current.loop = true

      // Preload audio
      audioRef.current.load()
    } catch (err) {
      console.error("Audio initialization error:", err)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[currentTrack])
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }

    const handleEnded = () => {
      // Switch to next track when current one ends
      const nextTrack = (currentTrack + 1) % tracks.length
      setCurrentTrack(nextTrack)
      if (audioRef.current) {
        audioRef.current.src = tracks[nextTrack]
        if (isPlaying) {
          audioRef.current.play().catch((err) => console.error("Audio play error:", err))
        }
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded)
        }
      }
    }
  }, [currentTrack, isMounted, isPlaying, tracks])

  // Update the togglePlay function to be more robust
  const togglePlay = () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Create a user interaction promise
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch((err) => {
              console.error("Audio play error:", err)
              // Show a message to the user that audio couldn't be played
            })
        }
      }

      setIsPlaying(!isPlaying)
    } catch (err) {
      console.error("Toggle play error:", err)
    }
  }

  const switchTrack = () => {
    if (!audioRef.current) return

    const nextTrack = (currentTrack + 1) % tracks.length
    setCurrentTrack(nextTrack)

    audioRef.current.src = tracks[nextTrack]
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error("Audio play error:", err))
    }
  }

  if (!isMounted) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-12 h-12 bg-black/70 border-2 border-white neon-border"
        onClick={togglePlay}
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 className="h-6 w-6 text-secondary" /> : <VolumeX className="h-6 w-6" />}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-black/70 border-2 border-white text-xs"
        onClick={switchTrack}
        title="Switch Track"
      >
        Next Track
      </Button>
    </div>
  )
}
*/
