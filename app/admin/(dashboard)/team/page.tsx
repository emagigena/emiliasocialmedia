import Link from "next/link"
import Image from "next/image"
import { getTeamMembers } from "@/lib/team"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil } from "lucide-react"
import DeleteTeamMemberButton from "@/components/admin/delete-team-member-button"

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Equipo</h1>
        <Button
          asChild
          className="bg-[#13115A] hover:bg-[#306BAC] dark:bg-[#306BAC] dark:hover:bg-[#6F9CEB] text-white"
        >
          <Link href="/admin/team/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Miembro
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="relative h-48 w-full">
              <Image src={member.imageUrl || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-[#306BAC] dark:text-[#6F9CEB] text-sm mb-3">{member.position}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{member.bio}</p>

              <div className="flex justify-between">
                <Button asChild variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                  <Link href={`/admin/team/edit/${member.id}`}>
                    <Pencil className="mr-1 h-3 w-3" />
                    Editar
                  </Link>
                </Button>

                <DeleteTeamMemberButton id={member.id} name={member.name} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No hay miembros del equipo para mostrar.</p>
          <Button
            asChild
            className="bg-[#13115A] hover:bg-[#306BAC] dark:bg-[#306BAC] dark:hover:bg-[#6F9CEB] text-white"
          >
            <Link href="/admin/team/new">Agregar primer miembro</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
