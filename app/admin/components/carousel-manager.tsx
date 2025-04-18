"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, Save, X, ArrowUp, ArrowDown } from "lucide-react"
import type { ICarousel } from "@/models/Carousel"

export default function CarouselManager() {
  const [carouselItems, setCarouselItems] = useState<ICarousel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    order: 0,
  })

  // Fetch carousel items
  const fetchCarouselItems = async () => {
    setIsLoading(true)
    try {
      const credentials = btoa("admin:password")
      const response = await fetch("/api/carousel", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch carousel items")
      }

      const data = await response.json()
      setCarouselItems(data)
    } catch (err) {
      setError("Error loading carousel items")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCarouselItems()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Start editing an item
  const handleEdit = (item: ICarousel) => {
    setEditingId(item._id)
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      order: item.order,
    })
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({
      title: "",
      description: "",
      image: "",
      order: 0,
    })
  }

  // Save edited item
  const handleSave = async () => {
    try {
      const credentials = btoa("admin:password")

      if (editingId) {
        // Update existing item
        const response = await fetch(`/api/carousel/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to update carousel item")
        }
      } else {
        // Create new item
        const response = await fetch("/api/carousel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to create carousel item")
        }
      }

      // Reset form and fetch updated list
      handleCancelEdit()
      fetchCarouselItems()
    } catch (err) {
      setError("Error saving carousel item")
      console.error(err)
    }
  }

  // Delete an item
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      return
    }

    try {
      const credentials = btoa("admin:password")
      const response = await fetch(`/api/carousel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete carousel item")
      }

      // Fetch updated list
      fetchCarouselItems()
    } catch (err) {
      setError("Error deleting carousel item")
      console.error(err)
    }
  }

  // Move item up or down in order
  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = carouselItems.findIndex((item) => item._id === id)
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === carouselItems.length - 1)
    ) {
      return
    }

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    try {
      const credentials = btoa("admin:password")

      // Update current item order
      await fetch(`/api/carousel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ order: carouselItems[swapIndex].order }),
      })

      // Update swapped item order
      await fetch(`/api/carousel/${carouselItems[swapIndex]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ order: carouselItems[currentIndex].order }),
      })

      // Fetch updated list
      fetchCarouselItems()
    } catch (err) {
      setError("Error reordering carousel items")
      console.error(err)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestionar Carousel</h2>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo
          </Button>
        )}
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Añadir"} Elemento del Carousel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Título del slide"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descripción breve"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Guardar
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* List of Carousel Items */}
      {carouselItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay elementos en el carousel. Añade uno nuevo para comenzar.
        </div>
      ) : (
        <div className="grid gap-4">
          {carouselItems.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-1 h-40 relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                </div>
                <div className="p-4 md:col-span-2">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                <div className="p-4 flex flex-col justify-center items-center space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      disabled={!!editingId || isAdding}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      disabled={!!editingId || isAdding}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorder(item._id, "up")}
                      disabled={!!editingId || isAdding}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorder(item._id, "down")}
                      disabled={!!editingId || isAdding}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
