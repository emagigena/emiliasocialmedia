"use server"

import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"
import { redirect } from "next/navigation"
import type { Project } from "@/types/project"
import type { TeamMember } from "@/types/team"

// Mock database for projects
let projects: Project[] = [
  {
    id: "1",
    title: "Campaña de Redes Sociales para Marca de Moda",
    description: "Estrategia completa de contenido para Instagram y Facebook que aumentó el engagement en un 45%.",
    category: "Community Management",
    imageUrl: "/placeholder.svg?height=400&width=600",
    detailedDescription:
      "Desarrollamos una estrategia integral de contenido para las plataformas de Instagram y Facebook de esta marca de moda. El enfoque se centró en crear contenido auténtico y atractivo que resonara con su audiencia objetivo. Implementamos un calendario editorial coherente, creamos contenido visual de alta calidad y gestionamos la interacción con la comunidad. Como resultado, la marca experimentó un aumento del 45% en el engagement, un crecimiento del 30% en seguidores y un incremento del 25% en el tráfico a su tienda online.",
    client: "Fashion Brand",
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "Sesión Fotográfica para Productos Gourmet",
    description: "Fotografía de productos para catálogo digital y redes sociales con estilo minimalista y elegante.",
    category: "Fotografía",
    imageUrl: "/placeholder.svg?height=400&width=600",
    detailedDescription:
      "Realizamos una sesión fotográfica profesional para una línea de productos gourmet, con el objetivo de crear imágenes atractivas para su catálogo digital y redes sociales. Adoptamos un enfoque minimalista y elegante que resaltara la calidad y exclusividad de los productos. El trabajo incluyó la dirección de arte, iluminación profesional, composición cuidadosa y post-producción detallada. Las imágenes resultantes ayudaron a la marca a mejorar su presencia online y aumentar sus ventas en un 35%.",
    client: "Gourmet Foods",
    date: "2023-06-22",
  },
  {
    id: "3",
    title: "Desarrollo Web para Estudio de Arquitectura",
    description:
      "Sitio web responsive con galería de proyectos, sistema de filtrado y formulario de contacto personalizado.",
    category: "Desarrollo Web",
    imageUrl: "/placeholder.svg?height=400&width=600",
    detailedDescription:
      "Diseñamos y desarrollamos un sitio web moderno y elegante para un estudio de arquitectura, con enfoque en mostrar su portafolio de proyectos de manera visual e impactante. El sitio incluye una galería de proyectos con sistema de filtrado por categorías, páginas detalladas para cada proyecto con galerías de imágenes, un blog integrado para compartir noticias y artículos, y un formulario de contacto personalizado. El diseño es completamente responsive y optimizado para SEO, lo que ha resultado en un aumento del 60% en consultas de potenciales clientes.",
    client: "Estudio Arquitectura",
    date: "2023-07-10",
  },
]

// Mock database for team members
let teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ana García",
    position: "Directora Creativa",
    bio: "Con más de 10 años de experiencia en diseño y estrategia de marca, Ana lidera nuestro equipo creativo con pasión e innovación.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    position: "Community Manager",
    bio: "Especialista en estrategias de redes sociales y creación de contenido que genera engagement y conversiones para nuestros clientes.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Laura Martínez",
    position: "Fotógrafa Principal",
    bio: "Fotógrafa profesional con ojo para el detalle y la composición. Especializada en fotografía de producto, moda y eventos corporativos.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Miguel Sánchez",
    position: "Desarrollador Web",
    bio: "Experto en desarrollo frontend y backend con amplia experiencia en la creación de sitios web y aplicaciones personalizadas.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
]

// Mock carousel items
let carouselItems = [
  {
    id: "1",
    title: "Community Management",
    description: "Potenciamos tu presencia en redes sociales con estrategias efectivas",
    ctaText: "Conoce más",
    ctaLink: "#services",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: "2",
    title: "Fotografía y Video",
    description: "Capturamos la esencia de tu marca con contenido visual de alta calidad",
    ctaText: "Ver portafolio",
    ctaLink: "#projects",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: "3",
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos y funcionales que destacan tu negocio",
    ctaText: "Nuestros servicios",
    ctaLink: "#services",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: "4",
    title: "Diseño Gráfico",
    description: "Diseñamos la identidad visual que tu marca necesita para destacar",
    ctaText: "Contáctanos",
    ctaLink: "#contact",
    imageUrl: "/placeholder.svg?height=800&width=1600",
  },
]

// Contact information
let contactInfo = {
  email: "info@emiliasf.com",
  phone: "+123 456 7890",
  location: "Ciudad, País",
  hours: "Lunes a Viernes: 9:00 AM - 6:00 PM",
}

// Contact form submission
export async function sendContactForm(formData: FormData) {
  try {
    // Get form data
    const formType = formData.get("form_type") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate common form data
    if (!name || !email || !message) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Process based on form type
    if (formType === "presupuesto") {
      const service = formData.get("service") as string
      const budget = formData.get("budget") as string

      if (!service || !budget) {
        return {
          success: false,
          message: "Por favor completa todos los campos requeridos.",
        }
      }

      console.log("Solicitud de presupuesto:", { name, email, service, budget, message })
    } else if (formType === "trabajo") {
      const phone = formData.get("phone") as string
      const position = formData.get("position") as string
      const experience = formData.get("experience") as string
      const portfolio = formData.get("portfolio") as string

      if (!phone || !position || !experience) {
        return {
          success: false,
          message: "Por favor completa todos los campos requeridos.",
        }
      }

      console.log("Solicitud de trabajo:", { name, email, phone, position, experience, message, portfolio })
    } else {
      // Fallback for original form
      const service = formData.get("service") as string

      if (!service) {
        return {
          success: false,
          message: "Por favor completa todos los campos requeridos.",
        }
      }

      console.log("Contact form submission:", { name, email, service, message })
    }

    // For now, we'll just simulate a successful submission
    return {
      success: true,
      message: "Mensaje enviado correctamente.",
    }
  } catch (error) {
    console.error("Error sending contact form:", error)
    return {
      success: false,
      message: "Hubo un error al enviar el formulario. Por favor intenta de nuevo.",
    }
  }
}

// Upload image to Vercel Blob
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return {
        success: false,
        message: "No se ha seleccionado ningún archivo.",
      }
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        message: "El archivo debe ser una imagen.",
      }
    }

    // Generate a unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
    })

    return {
      success: true,
      url: blob.url,
      message: "Imagen subida correctamente.",
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return {
      success: false,
      message: "Hubo un error al subir la imagen. Por favor intenta de nuevo.",
    }
  }
}

// Add a new project
export async function addProject(formData: FormData) {
  try {
    // Get form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const detailedDescription = formData.get("detailedDescription") as string
    const client = formData.get("client") as string
    const date = formData.get("date") as string
    const file = formData.get("image") as File

    // Validate form data
    if (!title || !description || !category || !file) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Upload image to Vercel Blob
    const imageFormData = new FormData()
    imageFormData.append("file", file)

    const imageUpload = await uploadImage(imageFormData)
    if (!imageUpload.success) return imageUpload

    // Create new project
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      category,
      imageUrl: imageUpload.url ?? 'fallback.jpg',
      detailedDescription,
      client,
      date,
    }

    // Add to projects array (in a real app, you would save to a database)
    projects.push(newProject)

    // Revalidate the projects page to show the new project
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return {
      success: true,
      message: "Proyecto agregado correctamente.",
    }
  } catch (error) {
    console.error("Error adding project:", error)
    return {
      success: false,
      message: "Hubo un error al agregar el proyecto. Por favor intenta de nuevo.",
    }
  }
}

// Update a project
export async function updateProject(formData: FormData) {
  try {
    // Get form data
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const detailedDescription = formData.get("detailedDescription") as string
    const client = formData.get("client") as string
    const date = formData.get("date") as string
    const file = formData.get("image") as File

    // Validate form data
    if (!id || !title || !description || !category) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Find the project to update
    const projectIndex = projects.findIndex((p) => p.id === id)

    if (projectIndex === -1) {
      return {
        success: false,
        message: "Proyecto no encontrado.",
      }
    }

    let imageUrl = projects[projectIndex].imageUrl

    // Upload new image if provided
    const imageFormData = new FormData()
    imageFormData.append("file", file)
    const imageUpload = await uploadImage(imageFormData)

    if (!imageUpload.success) {
      return imageUpload
    }


    // Update project
    projects[projectIndex] = {
      ...projects[projectIndex],
      title,
      description,
      category,
      imageUrl,
      detailedDescription,
      client,
      date,
    }

    // Revalidate paths
    revalidatePath("/")
    revalidatePath(`/projects/${id}`)
    revalidatePath("/admin/projects")

    return {
      success: true,
      message: "Proyecto actualizado correctamente.",
    }
  } catch (error) {
    console.error("Error updating project:", error)
    return {
      success: false,
      message: "Hubo un error al actualizar el proyecto. Por favor intenta de nuevo.",
    }
  }
}

// Delete a project
export async function deleteProject(id: string) {
  try {
    // Find the project to delete
    const projectIndex = projects.findIndex((p) => p.id === id)

    if (projectIndex === -1) {
      return {
        success: false,
        message: "Proyecto no encontrado.",
      }
    }

    // Delete the image from Vercel Blob (in a real app)
    // const imageUrl = projects[projectIndex].imageUrl
    // if (imageUrl && !imageUrl.includes('placeholder')) {
    //   await del(imageUrl)
    // }

    // Remove from projects array
    projects = projects.filter((p) => p.id !== id)

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return {
      success: true,
      message: "Proyecto eliminado correctamente.",
    }
  } catch (error) {
    console.error("Error deleting project:", error)
    return {
      success: false,
      message: "Hubo un error al eliminar el proyecto. Por favor intenta de nuevo.",
    }
  }
}

// Add a new team member
export async function addTeamMember(formData: FormData) {
  try {
    // Get form data
    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const bio = formData.get("bio") as string
    const file = formData.get("image") as File

    // Validate form data
    if (!name || !position || !bio || !file) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Upload image to Vercel Blob
    const imageFormData = new FormData()
    imageFormData.append("file", file)
    const imageUpload = await uploadImage(imageFormData)

    if (!imageUpload.success) {
      return imageUpload
    }

    // Create new team member
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name,
      position,
      bio,
      imageUrl: imageUpload.url ?? "fallback.jpg",
    }

    // Add to team members array
    teamMembers.push(newMember)

    // Revalidate the about page to show the new team member
    revalidatePath("/")
    revalidatePath("/admin/team")

    return {
      success: true,
      message: "Miembro del equipo agregado correctamente.",
    }
  } catch (error) {
    console.error("Error adding team member:", error)
    return {
      success: false,
      message: "Hubo un error al agregar el miembro del equipo. Por favor intenta de nuevo.",
    }
  }
}

// Update a team member
export async function updateTeamMember(formData: FormData) {
  try {
    // Get form data
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const bio = formData.get("bio") as string
    const file = formData.get("image") as File

    // Validate form data
    if (!id || !name || !position || !bio) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Find the team member to update
    const memberIndex = teamMembers.findIndex((m) => m.id === id)

    if (memberIndex === -1) {
      return {
        success: false,
        message: "Miembro del equipo no encontrado.",
      }
    }

    let imageUrl = teamMembers[memberIndex].imageUrl

    // Upload new image if provided
    const imageFormData = new FormData()
    imageFormData.append("file", file)
    const imageUpload = await uploadImage(imageFormData)
    if (!imageUpload.success) return imageUpload

    // Update team member
    teamMembers[memberIndex] = {
      ...teamMembers[memberIndex],
      name,
      position,
      bio,
      imageUrl,
    }

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/admin/team")

    return {
      success: true,
      message: "Miembro del equipo actualizado correctamente.",
    }
  } catch (error) {
    console.error("Error updating team member:", error)
    return {
      success: false,
      message: "Hubo un error al actualizar el miembro del equipo. Por favor intenta de nuevo.",
    }
  }
}

// Delete a team member
export async function deleteTeamMember(id: string) {
  try {
    // Find the team member to delete
    const memberIndex = teamMembers.findIndex((m) => m.id === id)

    if (memberIndex === -1) {
      return {
        success: false,
        message: "Miembro del equipo no encontrado.",
      }
    }

    // Delete the image from Vercel Blob (in a real app)
    // const imageUrl = teamMembers[memberIndex].imageUrl
    // if (imageUrl && !imageUrl.includes('placeholder')) {
    //   await del(imageUrl)
    // }

    // Remove from team members array
    teamMembers = teamMembers.filter((m) => m.id !== id)

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/admin/team")

    return {
      success: true,
      message: "Miembro del equipo eliminado correctamente.",
    }
  } catch (error) {
    console.error("Error deleting team member:", error)
    return {
      success: false,
      message: "Hubo un error al eliminar el miembro del equipo. Por favor intenta de nuevo.",
    }
  }
}

// Update carousel items
export async function updateCarouselItems(items: typeof carouselItems) {
  try {
    // Update carousel items
    carouselItems = items

    // Revalidate paths
    revalidatePath("/")

    return {
      success: true,
      message: "Carousel actualizado correctamente.",
    }
  } catch (error) {
    console.error("Error updating carousel:", error)
    return {
      success: false,
      message: "Hubo un error al actualizar el carousel. Por favor intenta de nuevo.",
    }
  }
}

// Update contact information
export async function updateContactInfo(info: typeof contactInfo) {
  try {
    // Update contact info
    contactInfo = info

    // Revalidate paths
    revalidatePath("/")

    return {
      success: true,
      message: "Información de contacto actualizada correctamente.",
    }
  } catch (error) {
    console.error("Error updating contact info:", error)
    return {
      success: false,
      message: "Hubo un error al actualizar la información de contacto. Por favor intenta de nuevo.",
    }
  }
}

// Admin login
export async function adminLogin(formData: FormData) {
  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // In a real application, you would validate credentials against a database
    // and use a proper authentication system
    if (username === "admin" && password === "password") {
      // Set a cookie or session token here in a real application
      redirect("/admin/dashboard")
    }

    return {
      success: false,
      message: "Credenciales inválidas. Por favor intenta de nuevo.",
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return {
      success: false,
      message: "Hubo un error al iniciar sesión. Por favor intenta de nuevo.",
    }
  }
}

// Get all projects (for use in server components)
export async function getProjects(): Promise<Project[]> {
  return projects
}

// Get project by ID (for use in server components)
export async function getProjectById(id: string): Promise<Project | null> {
  return projects.find((project) => project.id === id) || null
}

// Get all team members (for use in server components)
export async function getTeamMembers(): Promise<TeamMember[]> {
  return teamMembers
}

// Get team member by ID (for use in server components)
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  return teamMembers.find((member) => member.id === id) || null
}

// Get carousel items (for use in server components)
export async function getCarouselItems() {
  return carouselItems
}

// Get contact information (for use in server components)
export async function getContactInfo() {
  return contactInfo
}
