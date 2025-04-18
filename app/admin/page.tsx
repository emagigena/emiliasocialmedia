"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CarouselManager from "./components/carousel-manager"
import ProjectsManager from "./components/projects-manager"
import TeamManager from "./components/team-manager"
import FooterManager from "./components/footer-manager"
import ContactManager from "./components/contact-manager"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set up basic auth credentials
    const credentials = btoa("admin:password")

    // Check if we're authenticated
    fetch("/api/carousel", {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // If not authenticated, the middleware will handle the redirect
          console.error("Authentication failed")
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error)
      })
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Autenticando...</h1>
          <p>Si no eres redirigido, por favor verifica tus credenciales.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-dark">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona el contenido de Emilia Social Media</p>
        </header>

        <Tabs defaultValue="carousel" className="bg-white shadow-md rounded-lg p-6">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="contact">Mensajes</TabsTrigger>
          </TabsList>

          <TabsContent value="carousel">
            <CarouselManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="team">
            <TeamManager />
          </TabsContent>

          <TabsContent value="footer">
            <FooterManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
