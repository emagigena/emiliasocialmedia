import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Carousel from "@/models/Carousel"
import { isAdminRequest } from "@/lib/auth"

// GET a specific carousel item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const carouselItem = await Carousel.findById(params.id)

    if (!carouselItem) {
      return NextResponse.json({ error: "Carousel item not found" }, { status: 404 })
    }

    return NextResponse.json(carouselItem)
  } catch (error) {
    console.error("Error fetching carousel item:", error)
    return NextResponse.json({ error: "Failed to fetch carousel item" }, { status: 500 })
  }
}

// PUT (update) a carousel item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()

    const updatedCarouselItem = await Carousel.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    if (!updatedCarouselItem) {
      return NextResponse.json({ error: "Carousel item not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCarouselItem)
  } catch (error) {
    console.error("Error updating carousel item:", error)
    return NextResponse.json({ error: "Failed to update carousel item" }, { status: 500 })
  }
}

// DELETE a carousel item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const deletedCarouselItem = await Carousel.findByIdAndDelete(params.id)

    if (!deletedCarouselItem) {
      return NextResponse.json({ error: "Carousel item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Carousel item deleted successfully" })
  } catch (error) {
    console.error("Error deleting carousel item:", error)
    return NextResponse.json({ error: "Failed to delete carousel item" }, { status: 500 })
  }
}
