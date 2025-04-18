import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/projects"
import { getTeamMembers } from "@/lib/team"
import { ImagePlus, Users, FileText, BarChart, Phone } from "lucide-react"

export default async function AdminDashboard() {
  const projects = await getProjects()
  const teamMembers = await getTeamMembers()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Proyectos"
          value={projects.length.toString()}
          icon={<FileText className="h-8 w-8 text-[#306BAC]" />}
        />
        <DashboardCard
          title="Equipo"
          value={teamMembers.length.toString()}
          icon={<Users className="h-8 w-8 text-[#306BAC]" />}
        />
        <DashboardCard title="Mensajes" value="12" icon={<BarChart className="h-8 w-8 text-[#306BAC]" />} />
        <DashboardCard title="Imágenes" value="48" icon={<ImagePlus className="h-8 w-8 text-[#306BAC]" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Proyectos Recientes</CardTitle>
              <Button asChild variant="outline">
                <Link href="/admin/projects">Ver todos</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/projects/edit/${project.id}`}>Editar</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Acciones Rápidas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="h-auto py-4 bg-[#13115A] hover:bg-[#306BAC] text-white">
                <Link href="/admin/projects/new" className="flex flex-col items-center">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Nuevo Proyecto</span>
                </Link>
              </Button>
              <Button asChild className="h-auto py-4 bg-[#13115A] hover:bg-[#306BAC] text-white">
                <Link href="/admin/team/new" className="flex flex-col items-center">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Nuevo Miembro</span>
                </Link>
              </Button>
              <Button asChild className="h-auto py-4 bg-[#13115A] hover:bg-[#306BAC] text-white">
                <Link href="/admin/carousel" className="flex flex-col items-center">
                  <ImagePlus className="h-6 w-6 mb-2" />
                  <span>Editar Carousel</span>
                </Link>
              </Button>
              <Button asChild className="h-auto py-4 bg-[#13115A] hover:bg-[#306BAC] text-white">
                <Link href="/admin/contact" className="flex flex-col items-center">
                  <Phone className="h-6 w-6 mb-2" />
                  <span>Editar Contacto</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
