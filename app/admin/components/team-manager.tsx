"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, Save, X } from "lucide-react"
import type { ITeamMember } from "@/models/TeamMember"

export default function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: "",
    bio: "",
  })

  // Fetch team members
  const fetchTeamMembers = async () => {
    setIsLoading(true)
    try {
      const credentials = btoa("admin:password")
      const response = await fetch("/api/team", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch team members")
      }

      const data = await response.json()
      setTeamMembers(data)
    } catch (err) {
      setError("Error loading team members")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Start editing a team member
  const handleEdit = (member: ITeamMember) => {
    setEditingId(member._id)
    setFormData({
      name: member.name,
      position: member.position,
      image: member.image,
      bio: member.bio,
    })
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({
      name: "",
      position: "",
      image: "",
      bio: "",
    })
  }

  // Save edited team member
  const handleSave = async () => {
    try {
      const credentials = btoa("admin:password")

      if (editingId) {
        // Update existing team member
        const response = await fetch(`/api/team/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to update team member")
        }
      } else {
        // Create new team member
        const response = await fetch("/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to create team member")
        }
      }

      // Reset form and fetch updated list
      handleCancelEdit()
      fetchTeamMembers()
    } catch (err) {
      setError("Error saving team member")
      console.error(err)
    }
  }

  // Delete a team member
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este miembro del equipo?")) {
      return
    }

    try {
      const credentials = btoa("admin:password")
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete team member")
      }

      // Fetch updated list
      fetchTeamMembers()
    } catch (err) {
      setError("Error deleting team member")
      console.error(err)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestionar Equipo</h2>
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
            <CardTitle>{editingId ? "Editar" : "Añadir"} Miembro del Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <Input
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Cargo o posición"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Biografía</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Breve biografía profesional"
                  rows={3}
                  required
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

      {/* List of Team Members */}
      {teamMembers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay miembros del equipo. Añade uno nuevo para comenzar.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {teamMembers.map((member) => (
            <Card key={member._id} className="overflow-hidden">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 h-32 relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                </div>
                <div className="p-4 col-span-2">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary-medium text-sm mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member)}
                      disabled={!!editingId || isAdding}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(member._id)}
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
