import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Emilia Social Media | Community Management, Fotografía y Desarrollo Web",
  description:
    "Agencia especializada en Community Management, Fotografía, Video y Desarrollo Web. Potenciamos tu presencia digital con estrategias creativas y efectivas para aumentar tu visibilidad online.",
  keywords: [
    "community management",
    "fotografía profesional",
    "video marketing",
    "desarrollo web",
    "social media",
    "marketing digital",
    "gestión de redes sociales",
    "diseño web",
    "contenido digital",
    "estrategia digital",
  ],
  authors: [{ name: "Emilia Social Media" }],
  creator: "Emilia Social Media",
  publisher: "Emilia Social Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://emiliasocialmedia.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Emilia Social Media | Expertos en Marketing Digital",
    description:
      "Potenciamos tu presencia digital con servicios de Community Management, Fotografía, Video y Desarrollo Web.",
    url: "https://emiliasocialmedia.com",
    siteName: "Emilia Social Media",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Emilia Social Media - Agencia de Marketing Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emilia Social Media | Expertos en Marketing Digital",
    description:
      "Potenciamos tu presencia digital con servicios de Community Management, Fotografía, Video y Desarrollo Web.",
    images: ["/images/twitter-image.jpg"],
    creator: "@EmiliaSocialMedia",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "google-site-verification-code", // Reemplazar con el código real
  },
  category: "marketing digital",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
