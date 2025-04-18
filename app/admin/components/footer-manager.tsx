"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { ISocialLink } from "@/models/FooterInfo"

export default function FooterManager() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState<{
    subtitle: string
    location: string
    email: string
    phone: string
    socialLinks: ISocialLink[]
  }>({
    subtitle: "",
    location: "",
    email: "",
    phone: "",
    socialLinks: [],
  })

  // Fetch footer info
  const fetchFooterInfo = async () => {
    setIsLoading(true)
    try {
      const credentials = btoa("admin:password")
      const response = await fetch("/api/footer", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch footer info")
      }

      const data = await response.json()
      setFormData({
        subtitle: data.subtitle || "",
        location: data.location || "",
        email: data.email || "",
        phone: data.phone || "",
        socialLinks: data.socialLinks || [],
      })
    } catch (err) {
      setError("Error loading footer information")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFooterInfo()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle social link changes
  const handleSocialLinkChange = (index: number, field: keyof ISocialLink, value: string) => {
    setFormData((prev) => {
      const updatedLinks = [...prev.socialLinks]
      updatedLinks[index] = { ...updatedLinks[index], [field]: value }
      return { ...prev, socialLinks: updatedLinks }
    })
  }

  // Add new social link
  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }))
  }

  // Remove social link
  const removeSocialLink = (index: number) => {
    setFormData((prev) => {
      const updatedLinks = [...prev.socialLinks]
      updatedLinks.splice(index, 1)
      return { ...prev, socialLinks: updatedLinks }
    })
  }

  // Save footer info
  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    setError(null)

    try {
      const credentials = btoa("admin:password")
      const response = await fetch("/api/footer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update footer information")
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      setError("Error saving footer information")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestionar Footer</h2>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Información del footer actualizada correctamente
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Información del Footer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subtítulo</label>
              <Input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Subtítulo del footer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ubicación</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ciudad, País"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+00 000 000 0000" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Redes Sociales</label>
                <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
                  <Plus className="h-4 w-4 mr-1" /> Añadir Red Social
                </Button>
              </div>

              {formData.socialLinks.map((link, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <Input
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                      placeholder="Plataforma (ej: instagram)"
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                      placeholder="URL (ej: https://instagram.com/cuenta)"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSocialLink(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
