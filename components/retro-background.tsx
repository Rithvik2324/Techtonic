"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function RetroBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [gridItems, setGridItems] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setIsMounted(true)

    // Generate grid items
    const items = []
    const gridSize = 20

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        items.push({
          id: i * gridSize + j,
          x: (j / gridSize) * 100,
          y: (i / gridSize) * 100,
          delay: Math.random() * 5,
        })
      }
    }

    setGridItems(items)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated dots */}
      {gridItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute w-1.5 h-1.5 bg-primary rounded-full"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3 + 1,
          }}
        />
      ))}

      {/* Pac-Man animation */}
      <motion.div
        className="absolute"
        initial={{ left: "-50px", top: "30%" }}
        animate={{ left: "calc(100% + 50px)" }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 5,
        }}
      >
        <div className="w-10 h-10 bg-yellow-400 rounded-full relative">
          <motion.div
            className="absolute inset-0"
            animate={{
              clipPath: [
                "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              ],
            }}
            transition={{
              duration: 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </motion.div>

      {/* Space invader animation */}
      <motion.div
        className="absolute hidden md:block"
        initial={{ right: "-50px", bottom: "20%" }}
        animate={{ right: "calc(100% + 50px)" }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 7,
        }}
      >
        <div className="w-12 h-8 relative">
          <div className="absolute w-4 h-4 bg-green-500 top-0 left-4" />
          <div className="absolute w-12 h-4 bg-green-500 top-4 left-0" />
          <div className="absolute w-4 h-4 bg-green-500 top-0 left-0" />
          <div className="absolute w-4 h-4 bg-green-500 top-0 left-8" />
        </div>
      </motion.div>
    </div>
  )
}
