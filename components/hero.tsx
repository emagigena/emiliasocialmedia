"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  _id: string
  title: string
  description: string
  image: string
  order: number
}

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/carousel")
        if (!response.ok) {
          throw new Error("Failed to fetch carousel data")
        }
        const data = await response.json()
        setSlides(data)
      } catch (err) {
        console.error("Error loading carousel:", err)
        setError("Error loading carousel data")
        // Use default slides if API fails
        setSlides([
          {
            _id: "1",
            title: "Community Management",
            description: "Potenciamos tu presencia en redes sociales con estrategias efectivas",
            image: "/placeholder.svg?height=1080&width=1920",
            order: 0,
          },
          {
            _id: "2",
            title: "Fotografía y Video",
            description: "Capturamos la esencia de tu marca con contenido visual de alta calidad",
            image: "/placeholder.svg?height=1080&width=1920",
            order: 1,
          },
          {
            _id: "3",
            title: "Desarrollo Web",
            description: "Creamos experiencias digitales que conectan con tu audiencia",
            image: "/placeholder.svg?height=1080&width=1920",
            order: 2,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [slides.length, currentSlide])

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </section>
    )
  }

  if (error && slides.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-gray-600">No se pudieron cargar las imágenes del carousel.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`${slide.title} - ${slide.description}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-primary-dark/40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 max-w-4xl">{slide.title}</h1>
              <p className="text-xl md:text-2xl max-w-2xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  )
}
