import type React from "react"
import Link from "next/link"
import { Instagram, Facebook, Linkedin, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#13115A] text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="title-emilia text-2xl text-white">EMILIA</span>
              <span className="subtitle-social ml-2 text-sm text-[#91C499]">social media</span>
            </div>
            <p className="text-gray-300 mb-4">
              Servicios profesionales de Community Management, Fotografía y Video, Desarrollo Web y Diseño.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} label="Instagram" />
              <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} label="Facebook" />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href="mailto:info@emiliasf.com" icon={<Mail size={20} />} label="Email" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <FooterLink href="#services" label="Community Management" />
              <FooterLink href="#services" label="Fotografía y Video" />
              <FooterLink href="#services" label="Desarrollo Web" />
              <FooterLink href="#services" label="Diseño Gráfico" />
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <FooterLink href="#home" label="Inicio" />
              <FooterLink href="#services" label="Servicios" />
              <FooterLink href="#projects" label="Proyectos" />
              <FooterLink href="#about" label="Nosotros" />
              <FooterLink href="#contact" label="Contacto" />
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Emilia SF. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) => (
  <Link href={href} className="text-white hover:text-[#91C499] transition-colors" aria-label={label}>
    {icon}
  </Link>
)

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link href={href} className="text-gray-300 hover:text-[#91C499] transition-colors">
      {label}
    </Link>
  </li>
)

export default Footer
