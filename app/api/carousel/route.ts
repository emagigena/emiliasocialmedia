import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Carousel from "@/models/Carousel"
import { isAdminRequest } from "@/lib/auth"

// GET all carousel items
export async function GET() {
  try {
    await connectToDatabase()
    const carouselItems = await Carousel.find().sort({ order: 1 })
    return NextResponse.json(carouselItems)
  } catch (error) {
    console.error("Error fetching carousel items:", error)
    return NextResponse.json({ error: "Failed to fetch carousel items" }, { status: 500 })
  }
}

// POST new carousel item
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()
    const newCarouselItem = new Carousel(data)
    await newCarouselItem.save()
    return NextResponse.json(newCarouselItem, { status: 201 })
  } catch (error) {
    console.error("Error creating carousel item:", error)
    return NextResponse.json({ error: "Failed to create carousel item" }, { status: 500 })
  }
}
