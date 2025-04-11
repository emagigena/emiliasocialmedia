import { notFound } from "next/navigation"
import { getTeamMemberById } from "@/lib/team"
import EditTeamMemberForm from "@/components/admin/edit-team-member-form"

interface EditTeamMemberPageProps {
  params: {
    id: string
  }
}

export default async function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  const member = await getTeamMemberById(params.id)

  if (!member) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Editar Miembro del Equipo</h1>
      <EditTeamMemberForm member={member} />
    </div>
  )
}
