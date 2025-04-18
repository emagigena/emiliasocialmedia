import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Project from "@/models/Project"
import { isAdminRequest } from "@/lib/auth"

// GET a specific project
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const project = await Project.findById(params.id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Asegurar compatibilidad con proyectos antiguos
    const projectObj = project.toObject()
    if (!projectObj.images && projectObj.image) {
      projectObj.images = [projectObj.image]
    }

    return NextResponse.json(projectObj)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT (update) a project
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const updatedProject = await Project.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE a project
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const deletedProject = await Project.findByIdAndDelete(params.id)

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
