import Image from "next/image"
import type { TeamMember } from "@/types/team"
import { Card, CardContent } from "@/components/ui/card"

interface AboutSectionProps {
  teamMembers: TeamMember[]
}

const AboutSection = ({ teamMembers }: AboutSectionProps) => {
  return (
    <div className="container mx-auto">
      <h2 className="section-title text-center">Quiénes Somos</h2>

      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="section-subtitle">Nuestra Misión</h3>
            <p className="text-gray-600 mb-6">
              En Emilia SF, nuestra misión es potenciar la presencia digital de nuestros clientes a través de
              estrategias creativas y efectivas en Community Management, Fotografía, Desarrollo Web y Diseño. Nos
              comprometemos a ofrecer soluciones personalizadas que generen resultados tangibles y duraderos.
            </p>

            <h3 className="section-subtitle">Nuestra Visión</h3>
            <p className="text-gray-600">
              Aspiramos a ser reconocidos como líderes en la industria de servicios digitales, destacándonos por nuestra
              innovación, calidad y compromiso con la excelencia. Buscamos establecer relaciones a largo plazo con
              nuestros clientes, convirtiéndonos en socios estratégicos para su crecimiento y éxito.
            </p>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image src="/placeholder.svg?height=800&width=600" alt="Equipo Emilia SF" fill className="object-cover" />
          </div>
        </div>
      </div>

      <h3 className="section-subtitle text-center mb-8">Nuestro Equipo</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 w-full">
        <Image src={member.imageUrl || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>
      <CardContent className="p-6 text-center">
        <h4 className="text-xl font-bold text-[#13115A]">{member.name}</h4>
        <p className="text-[#306BAC] mb-2">{member.position}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
      </CardContent>
    </Card>
  )
}

export default AboutSection
