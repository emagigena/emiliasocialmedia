"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, Save, X, ImageIcon } from "lucide-react"
import type { IProject } from "@/models/Project"

const categories = ["Community Management", "Fotografía y Video", "Desarrollo Web"]

export default function ProjectsManager() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Community Management",
    images: [""], // Inicializado con un campo de imagen vacío
    description: "",
    client: "",
    results: "",
    date: "",
  })

  // Fetch projects
  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const credentials = btoa("admin:password")
      const response = await fetch("/api/projects", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError("Error loading projects")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle image input changes
  const handleImageChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images]
      updatedImages[index] = value
      return { ...prev, images: updatedImages }
    })
  }

  // Add new image field
  const addImageField = () => {
    if (formData.images.length < 5) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ""],
      }))
    }
  }

  // Remove image field
  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      setFormData((prev) => {
        const updatedImages = [...prev.images]
        updatedImages.splice(index, 1)
        return { ...prev, images: updatedImages }
      })
    }
  }

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  // Start editing a project
  const handleEdit = (project: IProject) => {
    setEditingId(project._id)

    // Asegurarse de que project.images sea un array
    const images = Array.isArray(project.images) ? project.images : [project.image || ""]

    setFormData({
      title: project.title,
      category: project.category,
      images: images, // Usar el array de imágenes
      description: project.description,
      client: project.client || "",
      results: project.results || "",
      date: project.date ? new Date(project.date).toISOString().split("T")[0] : "",
    })
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({
      title: "",
      category: "Community Management",
      images: [""],
      description: "",
      client: "",
      results: "",
      date: "",
    })
  }

  // Save edited project
  const handleSave = async () => {
    try {
      // Validar que al menos haya una imagen
      if (formData.images.length === 0 || !formData.images[0]) {
        setError("Debe proporcionar al menos una imagen")
        return
      }

      // Filtrar imágenes vacías
      const filteredImages = formData.images.filter((img) => img.trim() !== "")

      if (filteredImages.length === 0) {
        setError("Debe proporcionar al menos una imagen válida")
        return
      }

      const dataToSend = {
        ...formData,
        images: filteredImages,
      }

      const credentials = btoa("admin:password")

      if (editingId) {
        // Update existing project
        const response = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to update project")
        }
      } else {
        // Create new project
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to create project")
        }
      }

      // Reset form and fetch updated list
      handleCancelEdit()
      fetchProjects()
    } catch (err) {
      setError("Error saving project")
      console.error(err)
    }
  }

  // Delete a project
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      return
    }

    try {
      const credentials = btoa("admin:password")
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      // Fetch updated list
      fetchProjects()
    } catch (err) {
      setError("Error deleting project")
      console.error(err)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestionar Proyectos</h2>
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
            <CardTitle>{editingId ? "Editar" : "Añadir"} Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Título del proyecto"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Imágenes (máximo 5)</label>
                  {formData.images.length < 5 && (
                    <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                      <Plus className="h-4 w-4 mr-1" /> Añadir Imagen
                    </Button>
                  )}
                </div>

                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="flex-1"
                    />
                    {formData.images.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImageField(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1">
                  Añade entre 1 y 5 imágenes. La primera imagen será la principal.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descripción del proyecto"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cliente (opcional)</label>
                <Input
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  placeholder="Nombre del cliente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resultados (opcional)</label>
                <Textarea
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  placeholder="Resultados obtenidos"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fecha (opcional)</label>
                <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
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

      {/* List of Projects */}
      {projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay proyectos. Añade uno nuevo para comenzar.</div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-1 h-40 relative">
                  {/* Mostrar la primera imagen o una imagen por defecto */}
                  <img
                    src={
                      project.images && project.images.length > 0
                        ? project.images[0]
                        : project.image || "/placeholder.svg"
                    }
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                  {/* Indicador de múltiples imágenes */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1">
                      <ImageIcon className="h-4 w-4 text-primary-dark" />
                      <span className="text-xs font-medium ml-1">{project.images.length}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 md:col-span-2">
                  <div className="text-sm text-primary-medium mb-1">{project.category}</div>
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  {project.client && (
                    <p className="text-sm">
                      <span className="font-medium">Cliente:</span> {project.client}
                    </p>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-center items-center space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      disabled={!!editingId || isAdding}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project._id)}
                      disabled={!!editingId || isAdding}
                    >
                      <Trash2 className="h-4 w-4" />
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
