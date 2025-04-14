import HeroCarousel from "@/components/hero-carousel"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import { getProjects } from "@/lib/projects"
import { getTeamMembers } from "@/lib/team"
import { getCarouselItems, getContactInfo } from "@/lib/actions"

export default async function Home() {
  const projects = await getProjects()
  const teamMembers = await getTeamMembers()
  const carouselItems = await getCarouselItems()
  const contactInfo = await getContactInfo()

  return (
    <div className="flex flex-col w-full">
      <section id="home" className="w-full">
        <HeroCarousel items={carouselItems} />
      </section>

      <section id="services" className="py-16 px-4 md:px-8 lg:px-16">
        <ServicesSection />
      </section>

      <section id="projects" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <ProjectsSection projects={projects} />
      </section>

      <section id="about" className="py-16 px-4 md:px-8 lg:px-16">
        <AboutSection teamMembers={teamMembers} />
      </section>

      <section id="contact" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <ContactSection contactInfo={contactInfo} />
      </section>
    </div>
  )
}
