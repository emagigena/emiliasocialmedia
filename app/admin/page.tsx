"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { setCookie } from "cookies-next"

export default function AdminLogin() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real application, you would validate credentials against a database
      if (formData.username === "admin" && formData.password === "password") {
        // Set a cookie to indicate the user is authenticated
        setCookie("admin_authenticated", "true", {
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        })

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración.",
          variant: "default",
        })

        router.push("/admin/dashboard")
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Credenciales inválidas. Por favor intenta de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al iniciar sesión. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Acceso Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Usuario
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full bg-[#13115A] hover:bg-[#306BAC] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Para fines de demostración, usa:</p>
            <p>Usuario: admin / Contraseña: password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
