"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { updateTeamMember } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import type { TeamMember } from "@/types/team"

interface EditTeamMemberFormProps {
  member: TeamMember
}

export default function EditTeamMemberForm({ member }: EditTeamMemberFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(member.imageUrl)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    // Add the member ID to the form data
    formData.append("id", member.id)

    try {
      const result = await updateTeamMember(formData)

      if (result.success) {
        toast({
          title: "Miembro actualizado",
          description: "El miembro del equipo ha sido actualizado correctamente.",
          variant: "default",
        })
        router.push("/admin/team")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Hubo un problema al actualizar el miembro del equipo. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el miembro del equipo. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al equipo
            </Link>
          </Button>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <Input id="name" name="name" required defaultValue={member.name} />
            </div>

            <div className="space-y-2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Cargo
              </label>
              <Input id="position" name="position" required defaultValue={member.position} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biografía
            </label>
            <Textarea id="bio" name="bio" required defaultValue={member.bio} className="min-h-[150px]" />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Fotografía
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
                      <span className="font-medium">Haz clic para cambiar</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
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
                <div className="relative h-32 w-32 overflow-hidden rounded-md">
                  <Image src={previewUrl || "/placeholder.svg"} alt="Vista previa" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#13115A] hover:bg-[#306BAC] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
