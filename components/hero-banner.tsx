"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/use-auth"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import Image from "next/image"

export default function HeroBanner() {
  const { user, openAuthModal } = useAuth()
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const calculateTimeLeft = () => {
      const eventDate = new Date("2025-04-30T00:00:00")
      const difference = eventDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRegisterClick = () => {
    if (user) {
      router.push("#events")
    } else {
      openAuthModal()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="pixel-clouds"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/80"></div>

        {/* Floating pixels - only render on client side */}
        {isMounted && (
          <>
            {Array.from({ length: 20 }).map((_, i) => {
              // Safe random values that don't depend on window
              const randomX = (i * 5) % 100
              const randomY = (i * 7) % 100
              const randomOpacity = 0.2 + ((i * 3) % 8) / 10
              const randomDuration = 10 + ((i * 11) % 20)

              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-secondary rounded-none"
                  initial={{
                    x: `${randomX}%`,
                    y: `${randomY}%`,
                    opacity: randomOpacity,
                  }}
                  animate={{
                    y: [null, "-100%"],
                    opacity: [null, 0],
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              )
            })}

            {/* Animated 8-bit characters jumping */}
            <motion.div
              className="absolute bottom-20 left-[10%] hidden md:block"
              animate={{
                y: ["0%", "-30%", "0%"],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 1.5,
              }}
            >
              <Image src="/mario.png" alt="8-bit character" width={48} height={48} className="opacity-60" />
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-[10%] hidden md:block"
              animate={{
                y: ["0%", "-20%", "0%"],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 2,
              }}
            >
              <Image src="/pacman.png" alt="8-bit character" width={40} height={40} className="opacity-60" />
            </motion.div>
          </>
        )}

        <div className="pixel-terrain"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-pixel mb-4 neon-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            TECHTONIC&apos;25
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-pixel mb-6 text-secondary"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Arcade Retro Vibes
          </motion.p>

          <motion.p
            className="text-sm md:text-base mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            30th April 2025
          </motion.p>

          {/* Countdown timer */}
          <motion.div
            className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto mb-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="pixel-card flex flex-col items-center">
              <span className="text-xl md:text-3xl font-pixel text-accent">{timeLeft.days}</span>
              <span className="text-xs mt-1">DAYS</span>
            </div>
            <div className="pixel-card flex flex-col items-center">
              <span className="text-xl md:text-3xl font-pixel text-accent">{timeLeft.hours}</span>
              <span className="text-xs mt-1">HOURS</span>
            </div>
            <div className="pixel-card flex flex-col items-center">
              <span className="text-xl md:text-3xl font-pixel text-accent">{timeLeft.minutes}</span>
              <span className="text-xs mt-1">MINS</span>
            </div>
            <div className="pixel-card flex flex-col items-center">
              <span className="text-xl md:text-3xl font-pixel text-accent">{timeLeft.seconds}</span>
              <span className="text-xs mt-1">SECS</span>
            </div>
          </motion.div>


          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              className="pixel-button text-sm md:text-base px-8 py-6 relative group"
              onClick={handleRegisterClick}
            >
              <span className="relative z-10">{user ? "EXPLORE EVENTS" : "REGISTER NOW"}</span>

              {/* Animated pixel effect around button on hover */}
              <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 left-0 w-2 h-2 bg-primary"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-primary"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary"></div>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
