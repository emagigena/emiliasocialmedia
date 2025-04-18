"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import type { ISocialLink } from "@/models/FooterInfo"

interface FooterData {
  subtitle: string
  location: string
  email: string
  phone: string
  socialLinks: ISocialLink[]
}

const defaultFooterData: FooterData = {
  subtitle:
    "Potenciamos tu presencia digital con estrategias creativas y efectivas. Servicios de Community Management, Fotografía y Video, y Desarrollo Web.",
  location: "Buenos Aires, Argentina",
  email: "info@emiliasocialmedia.com",
  phone: "+54 11 1234 5678",
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
  ],
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("/api/footer")
        if (response.ok) {
          const data = await response.json()
          setFooterData(data)
        }
      } catch (error) {
        console.error("Error fetching footer data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFooterData()
  }, [])

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
      case "facebook":
        return <Facebook className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
      case "twitter":
        return <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
      default:
        return <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
    }
  }

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-baseline mb-4">
              <span className="emilia-title text-white text-2xl">EMILIA</span>
              <span className="social-media-subtitle text-primary-light text-lg ml-2">social media</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">{footerData.subtitle}</p>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((link, index) => (
                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                  {getSocialIcon(link.platform)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>{footerData.location}</p>
              <p>{footerData.email}</p>
              <p>{footerData.phone}</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Emilia Social Media. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
