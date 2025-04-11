import HeroCarousel from "@/components/hero-carousel"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import { getProjects } from "@/lib/projects"
import { getTeamMembers } from "@/lib/team"

export default async function Home() {
  const projects = await getProjects()
  const teamMembers = await getTeamMembers()

  return (
    <div className="flex flex-col w-full">
      <section id="home" className="w-full">
        <HeroCarousel />
      </section>

      <section id="projects" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <ProjectsSection projects={projects} />
      </section>

      <section id="about" className="py-16 px-4 md:px-8 lg:px-16">
        <AboutSection teamMembers={teamMembers} />
      </section>

      <section id="contact" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <ContactSection />
      </section>
    </div>
  )
}
