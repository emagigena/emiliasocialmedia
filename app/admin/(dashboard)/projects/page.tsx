import Link from "next/link"
import Image from "next/image"
import { getProjects } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil } from "lucide-react"
import DeleteProjectButton from "@/components/admin/delete-project-button"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Proyectos</h1>
        <Button
          asChild
          className="bg-[#13115A] hover:bg-[#306BAC] dark:bg-[#306BAC] dark:hover:bg-[#6F9CEB] text-white"
        >
          <Link href="/admin/projects/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="relative h-48 w-full">
              <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <span className="inline-block bg-[#6F9CEB] text-white text-xs px-2 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex justify-between">
                <Button asChild variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                  <Link href={`/admin/projects/edit/${project.id}`}>
                    <Pencil className="mr-1 h-3 w-3" />
                    Editar
                  </Link>
                </Button>

                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No hay proyectos para mostrar.</p>
          <Button
            asChild
            className="bg-[#13115A] hover:bg-[#306BAC] dark:bg-[#306BAC] dark:hover:bg-[#6F9CEB] text-white"
          >
            <Link href="/admin/projects/new">Agregar primer proyecto</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
