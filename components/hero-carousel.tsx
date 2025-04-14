"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the carousel item type
interface CarouselItem {
  id: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  imageUrl: string
}

interface HeroCarouselProps {
  items: CarouselItem[]
}

const HeroCarousel = ({ items }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Aseguramos que todos los botones del carousel redirijan a la sección de proyectos
  const processedItems = items.map((item) => ({
    ...item,
    ctaLink: "#projects", // Forzamos que todos los enlaces vayan a la sección de proyectos
  }))

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === processedItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? processedItems.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Pause autoplay on hover
  const pauseAutoplay = () => setIsAutoPlaying(false)
  const resumeAutoplay = () => setIsAutoPlaying(true)

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isAutoPlaying])

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Carousel Items */}
      {processedItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{item.title}</h1>
              <p className="mb-8 text-lg md:text-xl">{item.description}</p>
              <Button asChild className="bg-[#306BAC] hover:bg-[#6F9CEB] text-white px-8 py-3 text-lg">
                <a href="#projects">{item.ctaText}</a>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-30 p-2 text-white transition-all hover:bg-opacity-50"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-30 p-2 text-white transition-all hover:bg-opacity-50"
        aria-label="Siguiente slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {processedItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
