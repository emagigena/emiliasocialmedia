import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import TeamMember from "@/models/TeamMember"
import { isAdminRequest } from "@/lib/auth"

// GET all team members
export async function GET() {
  try {
    await connectToDatabase()
    const teamMembers = await TeamMember.find().sort({ name: 1 })
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

// POST new team member
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()
    const newTeamMember = new TeamMember(data)
    await newTeamMember.save()
    return NextResponse.json(newTeamMember, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
