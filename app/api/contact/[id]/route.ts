import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { isAdminRequest } from "@/lib/auth"

// GET a specific contact message
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const message = await Contact.findById(params.id)

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error fetching contact message:", error)
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 })
  }
}

// PUT (update) a contact message status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()

    // Solo permitir actualizar el estado
    if (!data.status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const updatedMessage = await Contact.findByIdAndUpdate(
      params.id,
      { status: data.status },
      { new: true, runValidators: true },
    )

    if (!updatedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error("Error updating contact message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

// DELETE a contact message
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const deletedMessage = await Contact.findByIdAndDelete(params.id)

    if (!deletedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
