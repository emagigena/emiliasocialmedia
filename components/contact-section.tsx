"use client"

import { useState } from "react"
import { sendContactForm } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, BriefcaseBusiness, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ContactSection = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await sendContactForm(formData)

      if (result.success) {
        toast({
          title: "Mensaje enviado",
          description: "Nos pondremos en contacto contigo pronto.",
          variant: "default",
        })
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto">
      <h2 className="section-title text-center">Contáctanos</h2>
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        ¿Tienes un proyecto en mente? ¿Necesitas ayuda con tu presencia digital? Completa el formulario y nos pondremos
        en contacto contigo a la brevedad.
      </p>

      <Tabs defaultValue="presupuesto" className="w-full mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="presupuesto" className="data-[state=active]:bg-[#306BAC] data-[state=active]:text-white">
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Solicitar Presupuesto
          </TabsTrigger>
          <TabsTrigger value="trabajo" className="data-[state=active]:bg-[#306BAC] data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Trabajar con Nosotros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presupuesto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form id="contact-form" action={handleSubmit} className="space-y-6">
                <input type="hidden" name="form_type" value="presupuesto" />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <Input id="name" name="name" type="text" required placeholder="Tu nombre" className="w-full" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="tu@email.com" className="w-full" />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Servicio de interés
                  </label>
                  <Select name="service">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "white" }}>
                      <SelectItem value="community">Community Management</SelectItem>
                      <SelectItem value="photo">Fotografía y Video</SelectItem>
                      <SelectItem value="web">Desarrollo Web</SelectItem>
                      <SelectItem value="design">Diseño</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Presupuesto aproximado
                  </label>
                  <Select name="budget">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "white" }}>
                      <SelectItem value="low">Menos de $500</SelectItem>
                      <SelectItem value="medium">$500 - $1000</SelectItem>
                      <SelectItem value="high">$1000 - $2000</SelectItem>
                      <SelectItem value="enterprise">Más de $2000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Detalles del proyecto
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Cuéntanos sobre tu proyecto o consulta"
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#13115A] hover:bg-[#306BAC] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Solicitar presupuesto"}
                </Button>
              </form>
            </div>

            <div className="bg-[#13115A] text-white rounded-lg p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-[#91C499]" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-300">info@emiliasf.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-[#91C499]" />
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-gray-300">+123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-[#91C499]" />
                    <div>
                      <h4 className="font-medium">Ubicación</h4>
                      <p className="text-gray-300">Ciudad, País</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-medium mb-2">Horario de atención</h4>
                <p className="text-gray-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trabajo">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form id="job-form" action={handleSubmit} className="space-y-6">
                <input type="hidden" name="form_type" value="trabajo" />
                <div>
                  <label htmlFor="job_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <Input id="job_name" name="name" type="text" required placeholder="Tu nombre" className="w-full" />
                </div>

                <div>
                  <label htmlFor="job_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <Input
                    id="job_email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="job_phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <Input
                    id="job_phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Tu número de teléfono"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="job_position" className="block text-sm font-medium text-gray-700 mb-1">
                    Área de interés
                  </label>
                  <Select name="position">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "white" }}>
                      <SelectItem value="community">Community Manager</SelectItem>
                      <SelectItem value="photo">Fotógrafo/Videógrafo</SelectItem>
                      <SelectItem value="web">Desarrollador Web</SelectItem>
                      <SelectItem value="design">Diseñador Gráfico</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="job_experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Experiencia
                  </label>
                  <Select name="experience">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu nivel de experiencia" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "white" }}>
                      <SelectItem value="junior">Junior (0-2 años)</SelectItem>
                      <SelectItem value="mid">Semi-Senior (2-4 años)</SelectItem>
                      <SelectItem value="senior">Senior (4+ años)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="job_message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje y experiencia
                  </label>
                  <Textarea
                    id="job_message"
                    name="message"
                    required
                    placeholder="Cuéntanos sobre tu experiencia y por qué te gustaría unirte a nuestro equipo"
                    className="w-full min-h-[150px]"
                  />
                </div>

                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                    Enlace a tu portfolio o LinkedIn (opcional)
                  </label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://tu-portfolio.com"
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#13115A] hover:bg-[#306BAC] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </form>
            </div>

            <div className="bg-[#13115A] text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Únete a nuestro equipo</h3>
              <p className="text-gray-300 mb-6">
                En Emilia SF estamos siempre en búsqueda de talento creativo y apasionado para formar parte de nuestro
                equipo. Si te interesa trabajar en un ambiente dinámico y colaborativo, ¡queremos conocerte!
              </p>

              <h4 className="text-xl font-semibold mb-4">Lo que valoramos:</h4>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li className="flex items-start">
                  <span className="text-[#91C499] mr-2">•</span> Creatividad y pensamiento innovador
                </li>
                <li className="flex items-start">
                  <span className="text-[#91C499] mr-2">•</span> Capacidad para trabajar en equipo
                </li>
                <li className="flex items-start">
                  <span className="text-[#91C499] mr-2">•</span> Compromiso con la excelencia
                </li>
                <li className="flex items-start">
                  <span className="text-[#91C499] mr-2">•</span> Pasión por el mundo digital
                </li>
                <li className="flex items-start">
                  <span className="text-[#91C499] mr-2">•</span> Actitud proactiva y resolutiva
                </li>
              </ul>

              <p className="text-gray-300">
                Completa el formulario y adjunta tu información. Revisaremos tu perfil y nos pondremos en contacto
                contigo si hay una oportunidad que se ajuste a tus habilidades.
              </p>
            </div>
          </div>
        </TabsContent >
      </Tabs >
    </div >
  )
}

export default ContactSection
