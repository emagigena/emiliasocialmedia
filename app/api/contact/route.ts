import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { isAdminRequest } from "@/lib/auth"

// GET all contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verificar si es una solicitud de administrador
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Obtener parámetros de filtro
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    // Construir la consulta
    const query: any = {}
    if (type) query.type = type
    if (status) query.status = status

    const messages = await Contact.find(query).sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 })
  }
}

// POST new contact message (public)
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const data = await request.json()

    // Validar datos básicos
    if (!data.name || !data.email || !data.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validar datos específicos según el tipo
    if (data.type === "client" && (!data.service || !data.message)) {
      return NextResponse.json({ error: "Missing required client fields" }, { status: 400 })
    }

    if (data.type === "career" && (!data.position || !data.experience)) {
      return NextResponse.json({ error: "Missing required career fields" }, { status: 400 })
    }

    // Crear nuevo mensaje
    const newContact = new Contact({
      ...data,
      status: "new", // Siempre comienza como nuevo
    })

    await newContact.save()
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
