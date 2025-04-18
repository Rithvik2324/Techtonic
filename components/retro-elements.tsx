"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function FloatingControllers() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Joystick */}
      <motion.div
        className="absolute"
        initial={{ x: "10%", y: "20%", rotate: 0 }}
        animate={{
          x: ["10%", "15%", "10%"],
          y: ["20%", "25%", "20%"],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Image src="/joystick.png" alt="Arcade Joystick" width={80} height={80} className="opacity-20 md:opacity-30" />
      </motion.div>

      {/* Gamepad */}
      <motion.div
        className="absolute"
        initial={{ x: "80%", y: "70%", rotate: 0 }}
        animate={{
          x: ["80%", "75%", "80%"],
          y: ["70%", "75%", "70%"],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Image src="/gamepad.png" alt="Retro Gamepad" width={100} height={60} className="opacity-20 md:opacity-30" />
      </motion.div>

      {/* Arcade buttons */}
      <motion.div
        className="absolute"
        initial={{ x: "70%", y: "30%", scale: 1 }}
        animate={{
          x: ["70%", "65%", "70%"],
          y: ["30%", "35%", "30%"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-red-500 opacity-20 md:opacity-30"></div>
          <div className="w-8 h-8 rounded-full bg-blue-500 opacity-20 md:opacity-30"></div>
        </div>
      </motion.div>

      {/* Cartridge */}
      <motion.div
        className="absolute hidden md:block"
        initial={{ x: "20%", y: "80%", rotate: 0 }}
        animate={{
          x: ["20%", "25%", "20%"],
          y: ["80%", "75%", "80%"],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Image src="/cartridge.png" alt="Game Cartridge" width={70} height={70} className="opacity-20 md:opacity-30" />
      </motion.div>
    </div>
  )
}

export function FloatingCoins({ count = 10 }) {
  const [coins, setCoins] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate coins only on the client side
    const newCoins = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
    }))
    setCoins(newCoins)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute"
          initial={{ x: `${coin.x}%`, y: "110%", rotate: 0 }}
          animate={{
            y: [null, "-10%"],
            rotate: [0, 360],
          }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Image src="/coin.png" alt="Pixel Coin" width={20} height={20} className="opacity-30" />
        </motion.div>
      ))}
    </div>
  )
}

export function RetroScanlines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 scanlines opacity-10" aria-hidden="true">
      <style jsx>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 50%
          );
          background-size: 100% 4px;
        }
      `}</style>
    </div>
  )
}

export function CrtEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 crt-effect" aria-hidden="true">
      <style jsx>{`
        .crt-effect {
          background: radial-gradient(
            circle at center,
            transparent 30%,
            rgba(0, 0, 0, 0.4) 100%
          );
        }
      `}</style>
    </div>
  )
}

export function PixelCharacters() {
  const characters = [
    { src: "/character1.png", width: 40, height: 40, position: { x: 15, y: 40 } },
    { src: "/character2.png", width: 40, height: 40, position: { x: 85, y: 60 } },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {characters.map((character, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${character.position.x}%`,
            y: `${character.position.y}%`,
          }}
          animate={{
            y: [`${character.position.y}%`, `${character.position.y - 5}%`, `${character.position.y}%`],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Image
            src={character.src || "/placeholder.svg"}
            alt="Pixel Character"
            width={character.width}
            height={character.height}
            className="opacity-30"
          />
        </motion.div>
      ))}
    </div>
  )
}

export function PowerUps() {
  const [powerUps, setPowerUps] = useState<Array<{ id: number; x: number; y: number; type: string }>>([])

  useEffect(() => {
    // Create random power-ups only on client side
    const newPowerUps = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 90 + 5, // 5% to 95%
      type: Math.random() > 0.5 ? "star" : "mushroom",
    }))

    setPowerUps(newPowerUps)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {powerUps.map((powerUp) => (
        <motion.div
          key={powerUp.id}
          className="absolute"
          style={{ left: `${powerUp.x}%`, top: `${powerUp.y}%` }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Image
            src={powerUp.type === "star" ? "/star.png" : "/mushroom.png"}
            alt={powerUp.type === "star" ? "Power Star" : "Mushroom"}
            width={30}
            height={30}
            className="opacity-20 md:opacity-30"
          />
        </motion.div>
      ))}
    </div>
  )
}

export function RetroElements() {
  return (
    <>
      <FloatingControllers />
      <FloatingCoins count={8} />
      <RetroScanlines />
      <CrtEffect />
      <PixelCharacters />
      <PowerUps />
    </>
  )
}
