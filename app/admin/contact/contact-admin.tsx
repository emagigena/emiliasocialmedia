"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { updateContactInfo } from "@/lib/actions"

interface ContactInfo {
  email: string
  phone: string
  location: string
  hours: string
}

interface ContactAdminProps {
  initialInfo: ContactInfo
}

export default function ContactAdmin({ initialInfo }: ContactAdminProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [contactInfo, setContactInfo] = useState(initialInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo({
      ...contactInfo,
      [field]: value,
    })
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    try {
      const result = await updateContactInfo(contactInfo)

      if (result.success) {
        toast({
          title: "Cambios guardados",
          description: "La información de contacto ha sido actualizada correctamente.",
          variant: "default",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Hubo un problema al guardar los cambios.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al guardar los cambios.",
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
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Información de Contacto</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={contactInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email de contacto"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <Input
                value={contactInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Número de teléfono"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Ubicación</label>
              <Input
                value={contactInfo.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Dirección o ubicación"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Horario de Atención</label>
              <Input
                value={contactInfo.hours}
                onChange={(e) => handleChange("hours", e.target.value)}
                placeholder="Horario de atención"
              />
            </div>
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
