import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Emilia SF - Community Management, Fotografía, Desarrollo Web y Diseño",
  description:
    "Servicios profesionales de Community Management, Fotografía y Video, Desarrollo Web y Diseño para potenciar tu presencia digital.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}


import './globals.css'