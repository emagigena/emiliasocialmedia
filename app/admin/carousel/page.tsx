"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, Trash2, MoveUp, MoveDown } from "lucide-react"
import Link from "next/link"

// Mock carousel items - in a real app, these would come from your database
const initialCarouselItems = [
  {
    id: "1",
    title: "Community Management",
    description: "Potenciamos tu presencia en redes sociales con estrategias efectivas",
    ctaText: "Conoce más",
    ctaLink: "#services",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: "2",
    title: "Fotografía y Video",
    description: "Capturamos la esencia de tu marca con contenido visual de alta calidad",
    ctaText: "Ver portafolio",
    ctaLink: "#projects",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: "3",
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos y funcionales que destacan tu negocio",
    ctaText: "Nuestros servicios",
    ctaLink: "#services",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: "4",
    title: "Diseño Gráfico",
    description: "Diseñamos la identidad visual que tu marca necesita para destacar",
    ctaText: "Contáctanos",
    ctaLink: "#contact",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
]

export default function CarouselAdmin() {
  const router = useRouter()
  const { toast } = useToast()
  const [carouselItems, setCarouselItems] = useState(initialCarouselItems)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMoveUp = (index: number) => {
    if (index === 0) return

    const newItems = [...carouselItems]
    const temp = newItems[index]
    newItems[index] = newItems[index - 1]
    newItems[index - 1] = temp

    setCarouselItems(newItems)
  }

  const handleMoveDown = (index: number) => {
    if (index === carouselItems.length - 1) return

    const newItems = [...carouselItems]
    const temp = newItems[index]
    newItems[index] = newItems[index + 1]
    newItems[index + 1] = temp

    setCarouselItems(newItems)
  }

  const handleDelete = (index: number) => {
    const newItems = [...carouselItems]
    newItems.splice(index, 1)
    setCarouselItems(newItems)
  }

  const handleAddNew = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "Nuevo Slide",
      description: "Descripción del nuevo slide",
      ctaText: "Botón",
      ctaLink: "#",
      imageUrl: "/placeholder.svg?height=800&width=1600",
    }

    setCarouselItems([...carouselItems, newItem])
  }

  const handleSave = () => {
    setIsSubmitting(true)

    // In a real app, you would save this to your database
    setTimeout(() => {
      toast({
        title: "Cambios guardados",
        description: "Los cambios en el carousel han sido guardados correctamente.",
        variant: "default",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Administrar Carousel</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Slides del Carousel</CardTitle>
            <Button onClick={handleAddNew} className="bg-[#13115A] hover:bg-[#306BAC] text-white">
              Agregar Nuevo Slide
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {carouselItems.map((item, index) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">Slide {index + 1}</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === carouselItems.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Título</label>
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...carouselItems]
                            newItems[index].title = e.target.value
                            setCarouselItems(newItems)
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Descripción</label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...carouselItems]
                            newItems[index].description = e.target.value
                            setCarouselItems(newItems)
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Texto del Botón</label>
                          <Input
                            value={item.ctaText}
                            onChange={(e) => {
                              const newItems = [...carouselItems]
                              newItems[index].ctaText = e.target.value
                              setCarouselItems(newItems)
                            }}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Enlace del Botón</label>
                          <Input
                            value={item.ctaLink}
                            onChange={(e) => {
                              const newItems = [...carouselItems]
                              newItems[index].ctaLink = e.target.value
                              setCarouselItems(newItems)
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">Imagen de Fondo</label>
                      <div className="relative h-40 w-full overflow-hidden rounded-md mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <label
                        htmlFor={`image-${item.id}`}
                        className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        <span className="text-sm">Cambiar imagen</span>
                        <Input id={`image-${item.id}`} type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className="bg-[#13115A] hover:bg-[#306BAC] text-white" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
