import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectsSectionProps {
  projects: Project[]
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <div className="container mx-auto">
      <h2 className="section-title text-center">Nuestros Proyectos</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Descubre algunos de nuestros trabajos más destacados en Community Management, Fotografía, Desarrollo Web y
        Diseño.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button className="bg-[#13115A] hover:bg-[#306BAC] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
          Ver más proyectos
        </Button>
      </div>
    </div>
  )
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="bg-secondary-foreground overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl h-full">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-[#6F9CEB] text-white text-xs px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-[#13115A]">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <Link
          href={`/projects/${project.id}`}
          className="text-[#306BAC] font-medium hover:text-[#13115A] transition-colors"
        >
          Ver detalles →
        </Link>
      </CardContent>
    </Card>
  )
}

export default ProjectsSection
