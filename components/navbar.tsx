"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-baseline">
            <span className="emilia-title text-primary-dark text-2xl md:text-3xl">EMILIA</span>
            <span className="social-media-subtitle text-primary-medium text-lg md:text-xl ml-2">social media</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#services" className="text-primary-dark hover:text-primary-medium transition-colors">
              Servicios
            </Link>
            <Link href="#projects" className="text-primary-dark hover:text-primary-medium transition-colors">
              Proyectos
            </Link>
            <Link href="#about" className="text-primary-dark hover:text-primary-medium transition-colors">
              Nosotros
            </Link>
            <Link href="#contact" className="text-primary-dark hover:text-primary-medium transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-dark"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="#services"
              className="text-primary-dark hover:text-primary-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Servicios
            </Link>
            <Link
              href="#projects"
              className="text-primary-dark hover:text-primary-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Proyectos
            </Link>
            <Link
              href="#about"
              className="text-primary-dark hover:text-primary-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Nosotros
            </Link>
            <Link
              href="#contact"
              className="text-primary-dark hover:text-primary-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
