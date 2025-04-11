"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { updateProject } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/types/project"

interface EditProjectFormProps {
  project: Project
}

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(project.imageUrl)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    // Add the project ID to the form data
    formData.append("id", project.id)

    try {
      const result = await updateProject(formData)

      if (result.success) {
        toast({
          title: "Proyecto actualizado",
          description: "El proyecto ha sido actualizado correctamente.",
          variant: "default",
        })
        router.push("/admin/projects")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Hubo un problema al actualizar el proyecto. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el proyecto. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4 dark:text-gray-300">
            <Link href="/admin/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a proyectos
            </Link>
          </Button>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Título del Proyecto
              </label>
              <Input
                id="title"
                name="title"
                required
                defaultValue={project.title}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Categoría
              </label>
              <Select name="category" defaultValue={project.category}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción Breve
            </label>
            <Textarea
              id="description"
              name="description"
              required
              defaultValue={project.description}
              maxLength={150}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción Detallada
            </label>
            <Textarea
              id="detailedDescription"
              name="detailedDescription"
              defaultValue={project.detailedDescription || ""}
              className="min-h-[150px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cliente
              </label>
              <Input
                id="client"
                name="client"
                defaultValue={project.client || ""}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fecha de Realización
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={project.date ? new Date(project.date).toISOString().split("T")[0] : ""}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Imagen del Proyecto
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Haz clic para cambiar</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {previewUrl && (
                <div className="relative h-32 w-full overflow-hidden rounded-md">
                  <Image src={previewUrl || "/placeholder.svg"} alt="Vista previa" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
              className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#13115A] hover:bg-[#306BAC] dark:bg-[#306BAC] dark:hover:bg-[#6F9CEB] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
