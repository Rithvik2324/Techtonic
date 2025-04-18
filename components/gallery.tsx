"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Hackathon participants coding",
    caption: "Hackathon 2024",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Robo Cars competition",
    caption: "Robo Cars Finals",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Tech debate session",
    caption: "Tech Debate Championship",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "AI Art showcase",
    caption: "AI Art Exhibition",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Puzzle solving competition",
    caption: "Puzzle Relay Challenge",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Award ceremony",
    caption: "TECHTONIC'24 Awards",
  },
]

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1))
  }

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-pixel mb-12 text-center neon-text">GALLERY</h2>

        <div className="max-w-4xl mx-auto">
          <Card className="pixel-card border-4 border-white bg-black relative overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="relative aspect-video">
                <Image
                  src={galleryImages[currentIndex].src || "/placeholder.svg"}
                  alt={galleryImages[currentIndex].alt}
                  fill
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                />

                {/* Retro frame overlay */}
                <div
                  className="absolute inset-0 border-8 border-white box-border pointer-events-none"
                  style={{ imageRendering: "pixelated" }}
                ></div>
                <div
                  className="absolute inset-0 border-4 border-black box-border pointer-events-none"
                  style={{ imageRendering: "pixelated" }}
                ></div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 font-pixel text-center text-sm">
                  {galleryImages[currentIndex].caption}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-none border-2 border-white bg-black/80 hover:bg-primary"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-none border-2 border-white bg-black/80 hover:bg-primary"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail navigation */}
          <div className="grid grid-cols-6 gap-2 mt-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 ${currentIndex === index ? "border-primary" : "border-white/50"}`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
