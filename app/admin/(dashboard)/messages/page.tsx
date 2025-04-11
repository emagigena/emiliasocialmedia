import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Tag } from "lucide-react"

// Mock messages for demonstration
const messages = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    service: "Desarrollo Web",
    message:
      "Me gustaría obtener más información sobre sus servicios de desarrollo web. Necesito una página para mi negocio.",
    date: "2023-10-15T14:30:00Z",
    read: true,
  },
  {
    id: "2",
    name: "María González",
    email: "maria@example.com",
    service: "Community Management",
    message:
      "Estoy interesada en sus servicios de gestión de redes sociales. ¿Podrían enviarme información sobre sus planes y precios?",
    date: "2023-10-14T09:15:00Z",
    read: false,
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",

    service: "Fotografía",
    message:
      "Necesito un fotógrafo para un evento corporativo el próximo mes. ¿Podrían darme información sobre disponibilidad y tarifas?",
    date: "2023-10-12T16:45:00Z",
    read: false,
  },
]

export default function MessagesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Mensajes de Contacto</h1>

      <div className="space-y-6">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`dark:bg-gray-800 dark:border-gray-700 ${
              !message.read ? "border-l-4 border-l-[#306BAC] dark:border-l-[#6F9CEB]" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl dark:text-white">{message.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(message.date).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{message.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Tag className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{message.service}</span>
                </div>
                <div className="flex items-center">
                  {!message.read && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Nuevo
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{message.message}</p>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  Marcar como {message.read ? "no leído" : "leído"}
                </Button>
                <Button className="bg-[#13115A] hover:bg-[#306BAC] dark:bg-[#306BAC] dark:hover:bg-[#6F9CEB] text-white">
                  Responder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No hay mensajes para mostrar.</p>
          </div>
        )}
      </div>
    </div>
  )
}
