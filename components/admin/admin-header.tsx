"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { deleteCookie } from "cookies-next"
import { useToast } from "@/hooks/use-toast"

export default function AdminHeader() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    deleteCookie("admin_authenticated")
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
      variant: "default",
    })
    router.push("/admin")
  }

  return (
    <header className="bg-white shadow-sm py-4 z-10 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center">
          <span className="title-emilia text-xl text-[#13115A]">EMILIA</span>
          <span className="subtitle-social ml-1 text-xs text-[#306BAC]">admin</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center text-gray-700 hover:text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
