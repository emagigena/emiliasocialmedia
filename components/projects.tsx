"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  _id: string
  title: string
  category: string
  image?: string // Para compatibilidad con proyectos antiguos
  images?: string[] // Nuevo campo para múltiples imágenes
  description: string
  client?: string
  results?: string
  date?: string
}

const categories = ["Todos", "Community Management", "Fotografía y Video", "Desarrollo Web"]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("Todos")
  const [selectedProject, setSelectedProject] = useState<null | Project>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Estado para los carruseles
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({})
  const [modalCurrentSlide, setModalCurrentSlide] = useState(0)

  // Referencias para los intervalos de los carruseles
  const slideIntervals = useRef<Record<string, NodeJS.Timeout>>({})

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects${filter !== "Todos" ? `?category=${filter}` : ""}`)
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()

        // Inicializar el estado de los slides para cada proyecto
        const initialSlides: Record<string, number> = {}
        data.forEach((project: Project) => {
          initialSlides[project._id] = 0
        })
        setCurrentSlides(initialSlides)

        setProjects(data)
      } catch (err) {
        console.error("Error loading projects:", err)
        setError("Error loading projects")
        // Use default projects if API fails
        setProjects([
          {
            _id: "1",
            title: "Campaña Redes Sociales",
            category: "Community Management",
            images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
            description: "Estrategia integral de contenidos para aumentar engagement y conversión en redes sociales.",
            client: "Marca de Moda",
            results: "Incremento del 45% en interacciones y 30% en seguidores en 3 meses.",
          },
          {
            _id: "2",
            title: "Sesión Fotográfica Productos",
            category: "Fotografía y Video",
            images: [
              "/placeholder.svg?height=600&width=800",
              "/placeholder.svg?height=600&width=800",
              "/placeholder.svg?height=600&width=800",
            ],
            description: "Fotografía profesional de productos para catálogo digital y redes sociales.",
            client: "Tienda de Decoración",
            results: "Aumento del 25% en ventas online tras la renovación visual.",
          },
          {
            _id: "3",
            title: "E-commerce Responsive",
            category: "Desarrollo Web",
            images: ["/placeholder.svg?height=600&width=800"],
            description: "Diseño y desarrollo de tienda online optimizada para móviles y SEO.",
            client: "Marca de Cosmética Natural",
            results: "Incremento del 60% en conversiones y reducción del 40% en tasa de rebote.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

    // Limpiar todos los intervalos al desmontar
    return () => {
      Object.values(slideIntervals.current).forEach((interval) => clearInterval(interval))
    }
  }, [filter])

  // Función para obtener las imágenes de un proyecto
  const getProjectImages = (project: Project): string[] => {
    if (project.images && project.images.length > 0) {
      return project.images
    }
    if (project.image) {
      return [project.image]
    }
    return ["/placeholder.svg"]
  }

  // Configurar los intervalos para los carruseles de las tarjetas
  useEffect(() => {
    // Limpiar intervalos existentes
    Object.values(slideIntervals.current).forEach((interval) => clearInterval(interval))
    slideIntervals.current = {}

    // Crear nuevos intervalos para proyectos con múltiples imágenes
    projects.forEach((project) => {
      const images = getProjectImages(project)
      if (images.length > 1) {
        slideIntervals.current[project._id] = setInterval(() => {
          setCurrentSlides((prev) => ({
            ...prev,
            [project._id]: (prev[project._id] + 1) % images.length,
          }))
        }, 2000) // Cambiar cada 2 segundos
      }
    })

    return () => {
      // Limpiar intervalos al desmontar
      Object.values(slideIntervals.current).forEach((interval) => clearInterval(interval))
    }
  }, [projects])

  // Limpiar el intervalo del proyecto seleccionado cuando se abre el modal
  useEffect(() => {
    if (selectedProject && slideIntervals.current[selectedProject._id]) {
      clearInterval(slideIntervals.current[selectedProject._id])
    }

    // Reiniciar el intervalo cuando se cierra el modal
    return () => {
      if (selectedProject) {
        const images = getProjectImages(selectedProject)
        if (images.length > 1) {
          slideIntervals.current[selectedProject._id] = setInterval(() => {
            setCurrentSlides((prev) => ({
              ...prev,
              [selectedProject._id]: (prev[selectedProject._id] + 1) % images.length,
            }))
          }, 2000)
        }
      }
    }
  }, [isDialogOpen, selectedProject])

  // Configurar intervalo para el carrusel del modal
  useEffect(() => {
    let modalInterval: NodeJS.Timeout | null = null

    if (isDialogOpen && selectedProject) {
      const images = getProjectImages(selectedProject)
      if (images.length > 1) {
        modalInterval = setInterval(() => {
          setModalCurrentSlide((prev) => (prev + 1) % images.length)
        }, 3000) // Cambiar cada 3 segundos en el modal
      }
    }

    return () => {
      if (modalInterval) clearInterval(modalInterval)
    }
  }, [isDialogOpen, selectedProject])

  const filteredProjects = projects

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setModalCurrentSlide(0) // Reiniciar el slide del modal
    setIsDialogOpen(true)
  }

  // Navegación del carrusel del modal
  const nextModalSlide = () => {
    if (!selectedProject) return
    const images = getProjectImages(selectedProject)
    setModalCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevModalSlide = () => {
    if (!selectedProject) return
    const images = getProjectImages(selectedProject)
    setModalCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  if (loading) {
    return (
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Nuestros Proyectos</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Cargando proyectos...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Nuestros Proyectos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre algunos de nuestros trabajos más destacados y los resultados que hemos logrado para nuestros
            clientes
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === category ? "bg-primary-medium text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            {error}
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No hay proyectos disponibles en esta categoría.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const projectImages = getProjectImages(project)
              const currentSlide = currentSlides[project._id] || 0
              const hasMultipleImages = projectImages.length > 1

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="relative h-64">
                    {/* Carrusel de imágenes */}
                    {projectImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Proyecto: ${project.title} - Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                    ))}

                    {/* Indicadores de slide (solo si hay múltiples imágenes) */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                        {projectImages.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-primary-medium font-medium">{project.category}</span>
                    <h3 className="text-xl font-bold text-primary-dark mt-2">{project.title}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Project Details Dialog with Carousel */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedProject && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary-dark">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-primary-medium">{selectedProject.category}</DialogDescription>
              </DialogHeader>

              {/* Carrusel de imágenes en el modal */}
              <div className="relative h-80 my-4">
                {getProjectImages(selectedProject).map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === modalCurrentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Detalle del proyecto: ${selectedProject.title} - Imagen ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority
                    />
                  </div>
                ))}

                {/* Controles de navegación del carrusel (solo si hay múltiples imágenes) */}
                {getProjectImages(selectedProject).length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevModalSlide()
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all z-10"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextModalSlide()
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all z-10"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>

                    {/* Indicadores de slide */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                      {getProjectImages(selectedProject).map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === modalCurrentSlide ? "bg-white scale-125" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">{selectedProject.description}</p>
                {selectedProject.client && (
                  <div>
                    <h4 className="font-semibold text-primary-dark">Cliente:</h4>
                    <p className="text-gray-700">{selectedProject.client}</p>
                  </div>
                )}
                {selectedProject.results && (
                  <div>
                    <h4 className="font-semibold text-primary-dark">Resultados:</h4>
                    <p className="text-gray-700">{selectedProject.results}</p>
                  </div>
                )}
                {selectedProject.date && (
                  <div>
                    <h4 className="font-semibold text-primary-dark">Fecha:</h4>
                    <p className="text-gray-700">{new Date(selectedProject.date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}
