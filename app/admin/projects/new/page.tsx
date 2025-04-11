"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProject } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function NewProject() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await addProject(formData)

      if (result.success) {
        toast({
          title: "Proyecto agregado",
          description: "El proyecto ha sido agregado correctamente.",
          variant: "default",
        })
        router.push("/admin/projects")
      } else {
        toast({
          title: "Error",
          description: result.message || "Hubo un problema al agregar el proyecto. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al agregar el proyecto. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Nuevo Proyecto</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título del Proyecto
                </label>
                <Input id="title" name="title" required placeholder="Ingresa el título del proyecto" />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Categoría
                </label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Community Management">Community Management</SelectItem>
                    <SelectItem value="Fotografía">Fotografía</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Desarrollo Web">Desarrollo Web</SelectItem>
                    <SelectItem value="Diseño">Diseño</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descripción Breve
              </label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Breve descripción del proyecto (máximo 150 caracteres)"
                maxLength={150}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="detailedDescription" className="text-sm font-medium">
                Descripción Detallada
              </label>
              <Textarea
                id="detailedDescription"
                name="detailedDescription"
                placeholder="Descripción detallada del proyecto"
                className="min-h-[150px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="client" className="text-sm font-medium">
                  Cliente
                </label>
                <Input id="client" name="client" placeholder="Nombre del cliente" />
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Fecha de Realización
                </label>
                <Input id="date" name="date" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Imagen del Proyecto
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Haz clic para subir</span> o arrastra y suelta
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      required
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {previewUrl && (
                  <div className="relative h-32 w-full overflow-hidden rounded-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Vista previa"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#13115A] hover:bg-[#306BAC] text-white" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar Proyecto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
