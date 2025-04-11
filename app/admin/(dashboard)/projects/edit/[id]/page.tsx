import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/projects"
import EditProjectForm from "@/components/admin/edit-project-form"

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Editar Proyecto</h1>
      <EditProjectForm project={project} />
    </div>
  )
}
