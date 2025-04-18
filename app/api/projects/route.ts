import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Project from "@/models/Project"
import { isAdminRequest } from "@/lib/auth"

// GET all projects
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Check if category filter is provided
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let query = {}
    if (category && category !== "Todos") {
      query = { category }
    }

    const projects = await Project.find(query).sort({ createdAt: -1 })

    // Asegurar compatibilidad con proyectos antiguos que usan 'image' en lugar de 'images'
    const processedProjects = projects.map((project) => {
      const projectObj = project.toObject()

      // Si no tiene el campo images pero tiene image, crear un array con esa imagen
      if (!projectObj.images && projectObj.image) {
        projectObj.images = [projectObj.image]
      }

      return projectObj
    })

    return NextResponse.json(processedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()

    // Asegurar que images es un array
    if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
      // Si no hay images pero hay image, usar ese
      if (data.image) {
        data.images = [data.image]
        delete data.image
      } else {
        return NextResponse.json({ error: "At least one image is required" }, { status: 400 })
      }
    }

    const newProject = new Project(data)
    await newProject.save()
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
