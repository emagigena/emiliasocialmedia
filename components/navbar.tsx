"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset for the navbar height
        behavior: "smooth",
      })
      closeMenu()
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="title-emilia text-2xl md:text-3xl text-[#13115A]">EMILIA</span>
            <span className="subtitle-social ml-2 text-sm md:text-base text-[#306BAC]">social media</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <NavLink href="#home" label="Inicio" onClick={scrollToSection} />
              <NavLink href="#services" label="Servicios" onClick={scrollToSection} />
              <NavLink href="#projects" label="Proyectos" onClick={scrollToSection} />
              <NavLink href="#about" label="Nosotros" onClick={scrollToSection} />
              <NavLink href="#contact" label="Contacto" onClick={scrollToSection} />
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-[#13115A] focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#home" label="Inicio" onClick={scrollToSection} />
            <MobileNavLink href="#services" label="Servicios" onClick={scrollToSection} />
            <MobileNavLink href="#projects" label="Proyectos" onClick={scrollToSection} />
            <MobileNavLink href="#about" label="Nosotros" onClick={scrollToSection} />
            <MobileNavLink href="#contact" label="Contacto" onClick={scrollToSection} />
          </div>
        </div>
      )}
    </header>
  )
}

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void
}) => (
  <a
    href={href}
    className="text-[#13115A] hover:text-[#306BAC] font-medium transition-colors"
    onClick={(e) => onClick(e, href.replace("#", ""))}
  >
    {label}
  </a>
)

const MobileNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void
}) => (
  <a
    href={href}
    className="text-[#13115A] hover:text-[#306BAC] font-medium py-2 transition-colors"
    onClick={(e) => onClick(e, href.replace("#", ""))}
  >
    {label}
  </a>
)

export default Navbar
