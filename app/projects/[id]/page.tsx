import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProjectById, getProjects } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  // Get related projects (excluding current project)
  const allProjects = await getProjects()
  const relatedProjects = allProjects
    .filter((p) => p.id !== params.id)
    .filter((p) => p.category === project.category)
    .slice(0, 3)

  return (
    <div className="container mx-auto py-16 px-4">
      <Link href="/#projects" className="inline-flex items-center text-[#306BAC] hover:text-[#13115A] mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a proyectos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden">
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="mb-2">
            <span className="inline-block bg-[#6F9CEB] text-white text-sm px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#13115A] mb-4">{project.title}</h1>

          {project.client && <p className="text-[#306BAC] font-medium mb-2">Cliente: {project.client}</p>}

          {project.date && (
            <p className="text-gray-500 mb-6">
              Fecha:{" "}
              {new Date(project.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
              })}
            </p>
          )}

          <div className="border-t border-gray-200 my-6 pt-6">
            <h2 className="text-xl font-bold mb-4">Descripción del Proyecto</h2>
            <p className="text-gray-600 mb-6">{project.detailedDescription || project.description}</p>
          </div>

          <Button
            asChild
            className="bg-[#13115A] hover:bg-[#306BAC] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            <Link href="#contact">Contactar para un proyecto similar</Link>
          </Button>
        </div>
      </div>

      {relatedProjects.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Otros Proyectos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((relatedProject) => (
              <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="block">
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <Image
                    src={relatedProject.imageUrl || "/placeholder.svg"}
                    alt={relatedProject.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-xl font-bold text-center px-4">{relatedProject.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
