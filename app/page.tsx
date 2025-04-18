import Hero from "@/components/hero"
import Services from "@/components/services"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { LocalBusinessJsonLd, FAQJsonLd } from "@/components/seo/json-ld"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LocalBusinessJsonLd
        name="Emilia Social Media"
        description="Agencia especializada en Community Management, Fotografía, Video y Desarrollo Web. Potenciamos tu presencia digital con estrategias creativas y efectivas."
        url="https://emiliasocialmedia.com"
        logo="https://emiliasocialmedia.com/logo.png"
        address="Buenos Aires, Argentina"
        telephone="+54 11 1234 5678"
        email="info@emiliasocialmedia.com"
        priceRange="$$"
        services={["Community Management", "Fotografía y Video", "Desarrollo Web", "Marketing Digital"]}
        images={["https://emiliasocialmedia.com/images/office.jpg", "https://emiliasocialmedia.com/images/team.jpg"]}
        sameAs={[
          "https://facebook.com/emiliasocialmedia",
          "https://instagram.com/emiliasocialmedia",
          "https://twitter.com/emiliasocial",
          "https://linkedin.com/company/emiliasocialmedia",
        ]}
      />
      <FAQJsonLd
        questions={[
          {
            question: "¿Qué servicios ofrece Emilia Social Media?",
            answer:
              "Ofrecemos servicios de Community Management, Fotografía y Video profesional, y Desarrollo Web. Nuestro objetivo es potenciar tu presencia digital con estrategias personalizadas.",
          },
          {
            question: "¿Cómo puedo contratar sus servicios?",
            answer:
              "Puedes contactarnos a través del formulario en nuestra web, por correo electrónico a info@emiliasocialmedia.com o llamando al +54 11 1234 5678.",
          },
          {
            question: "¿Trabajan con empresas de todos los tamaños?",
            answer:
              "Sí, trabajamos con empresas de todos los tamaños, desde emprendimientos hasta grandes corporaciones, adaptando nuestras estrategias a las necesidades específicas de cada cliente.",
          },
          {
            question: "¿Cuánto tiempo toma ver resultados en redes sociales?",
            answer:
              "Los resultados en redes sociales varían según diversos factores, pero generalmente comenzarás a ver mejoras en engagement y alcance dentro de los primeros 2-3 meses de implementar una estrategia consistente.",
          },
        ]}
      />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
