"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface TeamMember {
  _id: string
  name: string
  position: string
  image: string
  bio: string
}

export default function About() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team")
        if (!response.ok) {
          throw new Error("Failed to fetch team members")
        }
        const data = await response.json()
        setTeamMembers(data)
      } catch (err) {
        console.error("Error loading team members:", err)
        setError("Error loading team members")
        // Use default team members if API fails
        setTeamMembers([
          {
            _id: "1",
            name: "Ana García",
            position: "Directora Creativa",
            image: "/placeholder.svg?height=400&width=400",
            bio: "Con más de 10 años de experiencia en marketing digital y diseño, Ana lidera nuestro equipo creativo con pasión e innovación.",
          },
          {
            _id: "2",
            name: "Carlos Rodríguez",
            position: "Community Manager",
            image: "/placeholder.svg?height=400&width=400",
            bio: "Especialista en estrategias de contenido y gestión de comunidades online, Carlos ha trabajado con marcas nacionales e internacionales.",
          },
          {
            _id: "3",
            name: "Laura Martínez",
            position: "Fotógrafa Principal",
            image: "/placeholder.svg?height=400&width=400",
            bio: "Con un ojo único para la composición y el detalle, Laura captura la esencia de cada marca a través de su lente.",
          },
          {
            _id: "4",
            name: "Miguel Sánchez",
            position: "Desarrollador Web",
            image: "/placeholder.svg?height=400&width=400",
            bio: "Experto en tecnologías web modernas, Miguel crea experiencias digitales intuitivas, rápidas y visualmente atractivas.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Quiénes Somos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce al equipo detrás de Emilia Social Media y nuestra misión de potenciar tu presencia digital
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">Nuestra Historia</h3>
            <p className="text-gray-600 mb-4">
              Emilia Social Media nació en 2018 con una visión clara: ayudar a empresas y emprendedores a destacar en el
              mundo digital. Lo que comenzó como un pequeño estudio de diseño, rápidamente evolucionó para ofrecer
              servicios integrales de marketing digital.
            </p>
            <p className="text-gray-600">
              Hoy, nos enorgullece ser un equipo multidisciplinario de profesionales apasionados por la creatividad y la
              innovación. Nuestro enfoque personalizado y orientado a resultados nos ha permitido construir relaciones
              duraderas con clientes de diversos sectores.
            </p>
          </div>
          <div className="relative h-80 lg:h-auto rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Equipo de Emilia Social Media trabajando en proyectos creativos"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary-dark mb-4 text-center">Nuestra Misión y Visión</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-primary-medium mb-4">Misión</h4>
              <p className="text-gray-600">
                Potenciar la presencia digital de nuestros clientes mediante estrategias creativas y efectivas,
                generando conexiones significativas con sus audiencias y contribuyendo al crecimiento sostenible de sus
                negocios.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-primary-medium mb-4">Visión</h4>
              <p className="text-gray-600">
                Ser reconocidos como un referente en el sector del marketing digital, destacando por nuestra innovación,
                calidad y compromiso con el éxito de nuestros clientes, adaptándonos constantemente a las nuevas
                tendencias y tecnologías.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-primary-dark mb-8 text-center">Nuestro Equipo</h3>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - ${member.position} en Emilia Social Media`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary-dark">{member.name}</h4>
                  <p className="text-primary-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
