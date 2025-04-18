import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://emiliasocialmedia.com"

  // Páginas estáticas
  const routes = [
    "",
    "/servicios/community-management",
    "/servicios/fotografia-video",
    "/servicios/desarrollo-web",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}
