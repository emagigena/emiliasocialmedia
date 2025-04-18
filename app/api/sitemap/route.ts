import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Project from "@/models/Project"
import TeamMember from "@/models/TeamMember"

export async function GET() {
  try {
    await connectToDatabase()

    // Fetch projects and team members for dynamic URLs
    const projects = await Project.find({}, { _id: 1, title: 1, updatedAt: 1 })
    const teamMembers = await TeamMember.find({}, { _id: 1, name: 1, updatedAt: 1 })

    // Base URL
    const baseUrl = "https://emiliasocialmedia.com"

    // Static URLs
    const staticUrls = [
      {
        loc: baseUrl,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "1.0",
      },
      {
        loc: `${baseUrl}/servicios/community-management`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      },
      {
        loc: `${baseUrl}/servicios/fotografia-video`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      },
      {
        loc: `${baseUrl}/servicios/desarrollo-web`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      },
    ]

    // Project URLs
    const projectUrls = projects.map((project) => ({
      loc: `${baseUrl}/proyectos/${project._id}`,
      lastmod: project.updatedAt.toISOString(),
      changefreq: "monthly",
      priority: "0.7",
    }))

    // Team member URLs
    const teamUrls = teamMembers.map((member) => ({
      loc: `${baseUrl}/equipo/${member._id}`,
      lastmod: member.updatedAt.toISOString(),
      changefreq: "monthly",
      priority: "0.6",
    }))

    // Combine all URLs
    const allUrls = [...staticUrls, ...projectUrls, ...teamUrls]

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join("")}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return NextResponse.json({ error: "Failed to generate sitemap" }, { status: 500 })
  }
}
