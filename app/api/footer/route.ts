import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import FooterInfo from "@/models/FooterInfo"
import { isAdminRequest } from "@/lib/auth"

// GET footer info
export async function GET() {
  try {
    await connectToDatabase()

    // Get the first footer info document or create a default one if none exists
    let footerInfo = await FooterInfo.findOne()

    if (!footerInfo) {
      // Create default footer info
      footerInfo = await FooterInfo.create({
        subtitle: "Potenciamos tu presencia digital con estrategias creativas y efectivas.",
        location: "Buenos Aires, Argentina",
        email: "info@emiliasocialmedia.com",
        phone: "+54 11 1234 5678",
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com" },
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "twitter", url: "https://twitter.com" },
          { platform: "linkedin", url: "https://linkedin.com" },
        ],
      })
    }

    return NextResponse.json(footerInfo)
  } catch (error) {
    console.error("Error fetching footer info:", error)
    return NextResponse.json({ error: "Failed to fetch footer info" }, { status: 500 })
  }
}

// PUT (update) footer info
export async function PUT(request: NextRequest) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()

    // Find the first footer info document or create a new one
    let footerInfo = await FooterInfo.findOne()

    if (footerInfo) {
      // Update existing document
      footerInfo = await FooterInfo.findByIdAndUpdate(footerInfo._id, data, { new: true, runValidators: true })
    } else {
      // Create new document
      footerInfo = await FooterInfo.create(data)
    }

    return NextResponse.json(footerInfo)
  } catch (error) {
    console.error("Error updating footer info:", error)
    return NextResponse.json({ error: "Failed to update footer info" }, { status: 500 })
  }
}
