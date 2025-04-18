import { Camera, Globe, MessageSquare } from "lucide-react"

const services = [
  {
    icon: <MessageSquare className="h-12 w-12 text-primary-medium" />,
    title: "Community Management",
    description:
      "Gestionamos tus redes sociales con estrategias personalizadas para aumentar tu visibilidad, engagement y conversión. Creamos contenido relevante y mantenemos una comunicación efectiva con tu audiencia.",
  },
  {
    icon: <Camera className="h-12 w-12 text-primary-medium" />,
    title: "Fotografía y Video",
    description:
      "Producimos contenido visual de alta calidad que destaca la identidad de tu marca. Desde sesiones fotográficas profesionales hasta videos promocionales que capturan la esencia de tu negocio.",
  },
  {
    icon: <Globe className="h-12 w-12 text-primary-medium" />,
    title: "Desarrollo Web",
    description:
      "Diseñamos y desarrollamos sitios web a medida, optimizados para todos los dispositivos y motores de búsqueda. Creamos experiencias digitales que reflejan tu marca y conectan con tus clientes.",
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones integrales para potenciar tu presencia digital y conectar con tu audiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-2">
              <div className="mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-bold text-primary-dark mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
