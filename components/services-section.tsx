import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Globe, PenTool, Share2 } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Community Management",
    description:
      "Gestionamos tus redes sociales con estrategias efectivas para aumentar tu presencia digital y engagement con tu audiencia.",
    icon: Share2,
  },
  {
    id: 2,
    title: "Fotografía y Video",
    description:
      "Capturamos la esencia de tu marca con contenido visual de alta calidad que destaca tus productos y servicios.",
    icon: Camera,
  },
  {
    id: 3,
    title: "Desarrollo Web",
    description:
      "Creamos sitios web modernos, responsivos y optimizados para SEO que representan profesionalmente tu negocio.",
    icon: Globe,
  },
  {
    id: 4,
    title: "Diseño Gráfico",
    description:
      "Diseñamos la identidad visual que tu marca necesita para destacar, desde logos hasta material promocional.",
    icon: PenTool,
  },
]

const ServicesSection = () => {
  return (
    <div className="container mx-auto">
      <h2 className="section-title text-center">Nuestros Servicios</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Ofrecemos soluciones integrales para potenciar tu presencia digital y destacar tu marca en el mercado.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {services.map((service) => (
          <Card key={service.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-[#6F9CEB]/10 text-[#306BAC]">
                  <service.icon size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#13115A]">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          asChild
          className="bg-[#13115A] hover:bg-[#306BAC] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
        >
          <a href="#projects">Ver nuestros proyectos</a>
        </Button>
      </div>
    </div>
  )
}

export default ServicesSection
