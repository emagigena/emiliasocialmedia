"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Mail, CheckCircle, Archive, Eye, EyeOff } from "lucide-react"
import type { IContact } from "@/models/Contact"

export default function ContactManager() {
  const [messages, setMessages] = useState<IContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null)

  // Fetch messages
  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const credentials = btoa("admin:password")

      // Construir la URL con los filtros
      let url = "/api/contact"
      const params = new URLSearchParams()

      if (activeTab !== "all") {
        params.append("type", activeTab)
      }

      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json()
      setMessages(data)
    } catch (err) {
      setError("Error loading messages")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [activeTab, statusFilter])

  // Actualizar el estado de un mensaje
  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const credentials = btoa("admin:password")
      const response = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update message status")
      }

      // Actualizar la lista de mensajes
      fetchMessages()
    } catch (err) {
      setError("Error updating message status")
      console.error(err)
    }
  }

  // Eliminar un mensaje
  const deleteMessage = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este mensaje?")) {
      return
    }

    try {
      const credentials = btoa("admin:password")
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }

      // Actualizar la lista de mensajes
      fetchMessages()
    } catch (err) {
      setError("Error deleting message")
      console.error(err)
    }
  }

  // Obtener el color de la insignia según el estado
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-green-100 text-green-800"
      case "replied":
        return "bg-purple-100 text-purple-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Renderizar el contenido específico según el tipo de mensaje
  const renderMessageContent = (message: IContact) => {
    if (message.type === "client") {
      return (
        <>
          <div className="mb-2">
            <span className="font-medium">Servicio:</span>{" "}
            {message.service === "community"
              ? "Community Management"
              : message.service === "photo"
                ? "Fotografía y Video"
                : "Desarrollo Web"}
          </div>
          <div>
            <span className="font-medium">Mensaje:</span>
            <p className="mt-1 whitespace-pre-wrap">{message.message}</p>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="mb-2">
            <span className="font-medium">Posición:</span>{" "}
            {message.position === "community-manager"
              ? "Community Manager"
              : message.position === "photographer"
                ? "Fotógrafo/Videógrafo"
                : message.position === "web-developer"
                  ? "Desarrollador Web"
                  : "Diseñador Gráfico"}
          </div>
          <div className="mb-2">
            <span className="font-medium">Experiencia:</span>
            <p className="mt-1 whitespace-pre-wrap">{message.experience}</p>
          </div>
          {message.portfolio && (
            <div>
              <span className="font-medium">Portfolio:</span>{" "}
              <a
                href={message.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-medium hover:underline"
              >
                {message.portfolio}
              </a>
            </div>
          )}
        </>
      )
    }
  }

  if (isLoading && messages.length === 0) {
    return <div className="text-center py-8">Cargando mensajes...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestionar Mensajes de Contacto</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filtrar por estado:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="new">Nuevos</SelectItem>
              <SelectItem value="read">Leídos</SelectItem>
              <SelectItem value="replied">Respondidos</SelectItem>
              <SelectItem value="archived">Archivados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="client">Clientes</TabsTrigger>
          <TabsTrigger value="career">Candidatos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderMessagesList(messages)}</TabsContent>

        <TabsContent value="client">{renderMessagesList(messages.filter((msg) => msg.type === "client"))}</TabsContent>

        <TabsContent value="career">{renderMessagesList(messages.filter((msg) => msg.type === "career"))}</TabsContent>
      </Tabs>
    </div>
  )

  function renderMessagesList(messagesList: IContact[]) {
    if (messagesList.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No hay mensajes {activeTab !== "all" ? (activeTab === "client" ? "de clientes" : "de candidatos") : ""}{" "}
          {statusFilter !== "all" && `con estado "${statusFilter}"`}.
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {messagesList.map((message) => (
          <Card key={message._id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-lg">{message.name}</CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  <a href={`mailto:${message.email}`} className="hover:underline">
                    {message.email}
                  </a>
                </div>
              </div>
              <Badge className={getStatusBadgeColor(message.status)}>
                {message.status === "new"
                  ? "Nuevo"
                  : message.status === "read"
                    ? "Leído"
                    : message.status === "replied"
                      ? "Respondido"
                      : "Archivado"}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="mr-2">
                      {message.type === "client" ? "Cliente" : "Candidato"}
                    </Badge>
                    <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                  </div>

                  {expandedMessage === message._id ? (
                    <div className="mt-2 text-gray-700">{renderMessageContent(message)}</div>
                  ) : (
                    <div className="mt-2 text-gray-700 line-clamp-2">
                      {message.type === "client" ? message.message : message.experience}
                    </div>
                  )}
                </div>

                <div className="flex space-x-1 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedMessage(expandedMessage === message._id ? null : message._id)}
                    title={expandedMessage === message._id ? "Colapsar" : "Expandir"}
                  >
                    {expandedMessage === message._id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {message.status === "new" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(message._id, "read")}
                      title="Marcar como leído"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  {(message.status === "new" || message.status === "read") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(message._id, "replied")}
                      title="Marcar como respondido"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  {message.status !== "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(message._id, "archived")}
                      title="Archivar"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(message._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}
