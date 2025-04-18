"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function Contact() {
  const [clientSubmitted, setClientSubmitted] = useState(false)
  const [careerSubmitted, setCareerSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estado para los formularios
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    service: "community", // Valor por defecto
    message: "",
  })

  const [careerForm, setCareerForm] = useState({
    name: "",
    email: "",
    position: "community-manager", // Valor por defecto
    experience: "",
    portfolio: "",
  })

  // Manejar cambios en el formulario de clientes
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setClientForm((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar cambios en el formulario de candidatos
  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCareerForm((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar cambios en los radio buttons
  const handleClientServiceChange = (value: string) => {
    setClientForm((prev) => ({ ...prev, service: value }))
  }

  const handleCareerPositionChange = (value: string) => {
    setCareerForm((prev) => ({ ...prev, position: value }))
  }

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "client",
          name: clientForm.name,
          email: clientForm.email,
          service: clientForm.service,
          message: clientForm.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      setClientSubmitted(true)
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setClientSubmitted(false)
        setClientForm({
          name: "",
          email: "",
          service: "community",
          message: "",
        })
      }, 3000)
    } catch (err) {
      console.error("Error:", err)
      setError("No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "career",
          name: careerForm.name,
          email: careerForm.email,
          position: careerForm.position,
          experience: careerForm.experience,
          portfolio: careerForm.portfolio,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud")
      }

      setCareerSubmitted(true)
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setCareerSubmitted(false)
        setCareerForm({
          name: "",
          email: "",
          position: "community-manager",
          experience: "",
          portfolio: "",
        })
      }, 3000)
    } catch (err) {
      console.error("Error:", err)
      setError("No se pudo enviar la solicitud. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Contáctanos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a potenciar tu presencia digital. ¡Cuéntanos sobre tu proyecto!
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="client"
                className="data-[state=active]:bg-primary-medium data-[state=active]:text-white"
              >
                Clientes
              </TabsTrigger>
              <TabsTrigger
                value="career"
                className="data-[state=active]:bg-primary-medium data-[state=active]:text-white"
              >
                Trabaja con nosotros
              </TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              {clientSubmitted ? (
                <div className="bg-accent/20 rounded-lg p-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-dark mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleClientSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" name="name" value={clientForm.name} onChange={handleClientChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={clientForm.email}
                        onChange={handleClientChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Servicio de interés</Label>
                    <RadioGroup value={clientForm.service} onValueChange={handleClientServiceChange}>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="community" id="community" />
                          <Label htmlFor="community">Community Management</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="photo" id="photo" />
                          <Label htmlFor="photo">Fotografía y Video</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="web" id="web" />
                          <Label htmlFor="web">Desarrollo Web</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={clientForm.message}
                      onChange={handleClientChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="career">
              {careerSubmitted ? (
                <div className="bg-accent/20 rounded-lg p-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-dark mb-2">¡Solicitud enviada!</h3>
                  <p className="text-gray-600">
                    Gracias por tu interés en unirte a nuestro equipo. Revisaremos tu información y te contactaremos
                    pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="career-name">Nombre completo</Label>
                      <Input
                        id="career-name"
                        name="name"
                        value={careerForm.name}
                        onChange={handleCareerChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="career-email">Correo electrónico</Label>
                      <Input
                        id="career-email"
                        name="email"
                        type="email"
                        value={careerForm.email}
                        onChange={handleCareerChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Posición de interés</Label>
                    <RadioGroup value={careerForm.position} onValueChange={handleCareerPositionChange}>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="community-manager" id="community-manager" />
                          <Label htmlFor="community-manager">Community Manager</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="photographer" id="photographer" />
                          <Label htmlFor="photographer">Fotógrafo/Videógrafo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="web-developer" id="web-developer" />
                          <Label htmlFor="web-developer">Desarrollador Web</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="designer" id="designer" />
                          <Label htmlFor="designer">Diseñador Gráfico</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiencia y habilidades</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      rows={5}
                      value={careerForm.experience}
                      onChange={handleCareerChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Enlace a portfolio o LinkedIn (opcional)</Label>
                    <Input id="portfolio" name="portfolio" value={careerForm.portfolio} onChange={handleCareerChange} />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
