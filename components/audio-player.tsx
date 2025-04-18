"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AudioPlayerProps {
  src: string
  volume?: number
  loop?: boolean
  className?: string
  iconSize?: number
}

export default function AudioPlayer({
  src,
  volume = 0.3,
  loop = true,
  className = "rounded-full w-12 h-12 bg-black border-2 border-white neon-border",
  iconSize = 6,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

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

  useEffect(() => {
    if (!audioAvailable) return

    // Create audio element programmatically instead of using ref
    const audio = new Audio()
    audioRef.current = audio

    const handleCanPlay = () => {
      console.log("Audio can play:", src)
      setIsLoaded(true)
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setIsError(true)
      setIsLoaded(false)
      toast({
        title: "Audio Unavailable",
        description: "Background music couldn't be loaded. The experience will continue without sound.",
        variant: "destructive",
      })
    }

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false)
      }
    }

    // Set up event listeners
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)
    audio.addEventListener("ended", handleEnded)

    // Set properties
    audio.volume = volume
    audio.loop = loop
    audio.preload = "auto"

    // Set source last
    audio.src = src

    return () => {
      // Clean up event listeners
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("ended", handleEnded)

      // Stop and clean up audio
      audio.pause()
      audio.src = ""
      audioRef.current = null
    }
  }, [src, volume, loop, toast, audioAvailable])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || isError || !isLoaded) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Play failed:", error)
              setIsPlaying(false)
              setIsError(true)
              toast({
                title: "Playback Error",
                description: "Unable to play audio. This may be due to browser restrictions.",
                variant: "destructive",
              })
            })
        }
      }
    } catch (error) {
      console.error("Toggle play error:", error)
      setIsError(true)
    }
  }

  // Show different icon based on state
  const getIcon = () => {
    if (isError || !audioAvailable) {
      return <AlertCircle className={`h-${iconSize} w-${iconSize} text-destructive`} />
    }
    return isPlaying ? (
      <Volume2 className={`h-${iconSize} w-${iconSize} text-secondary`} />
    ) : (
      <VolumeX className={`h-${iconSize} w-${iconSize}`} />
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={togglePlay}
      title={isPlaying ? "Mute Sound" : "Play Sound"}
      disabled={isError || !isLoaded || !audioAvailable}
    >
      {getIcon()}
    </Button>
  )
}
