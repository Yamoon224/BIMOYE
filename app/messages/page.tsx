"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile } from "lucide-react"

const mockConversations = [
  {
    id: 1,
    name: "Support Mafamo",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Votre réservation a été confirmée !",
    timestamp: "Il y a 2h",
    unread: 1,
    online: true,
    type: "support",
  },
  {
    id: 2,
    name: "Villa Océane - Propriétaire",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Les clés seront disponibles à 15h",
    timestamp: "Il y a 4h",
    unread: 0,
    online: false,
    type: "host",
  },
  {
    id: 3,
    name: "Chalet Montagne - Marie",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Merci pour votre séjour !",
    timestamp: "Hier",
    unread: 0,
    online: true,
    type: "host",
  },
  {
    id: 4,
    name: "Équipe Conciergerie",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Votre transfert est organisé",
    timestamp: "Il y a 2 jours",
    unread: 2,
    online: true,
    type: "concierge",
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "support",
    content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    timestamp: "14:30",
    isOwn: false,
  },
  {
    id: 2,
    sender: "user",
    content: "Bonjour, j'ai une question concernant ma réservation pour la Villa Océane",
    timestamp: "14:32",
    isOwn: true,
  },
  {
    id: 3,
    sender: "support",
    content: "Bien sûr ! Je vois votre réservation. Quelle est votre question ?",
    timestamp: "14:33",
    isOwn: false,
  },
  {
    id: 4,
    sender: "user",
    content: "Est-il possible d'arriver plus tôt que prévu ? Vers 13h au lieu de 15h ?",
    timestamp: "14:35",
    isOwn: true,
  },
  {
    id: 5,
    sender: "support",
    content: "Je vais vérifier avec le propriétaire et vous confirmer dans les plus brefs délais.",
    timestamp: "14:36",
    isOwn: false,
  },
  {
    id: 6,
    sender: "support",
    content: "Bonne nouvelle ! Le propriétaire accepte votre arrivée à 13h. Votre réservation a été mise à jour.",
    timestamp: "15:45",
    isOwn: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const selectedConv = mockConversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "support":
        return "bg-blue-100 text-blue-800"
      case "host":
        return "bg-green-100 text-green-800"
      case "concierge":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "support":
        return "Support"
      case "host":
        return "Propriétaire"
      case "concierge":
        return "Conciergerie"
      default:
        return "Autre"
    }
  }

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Messages</h1>
          <p className="text-gray-600 dark:text-gray-300">Communiquez avec nos équipes et les propriétaires</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Liste des conversations */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une conversation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedConversation === conversation.id
                        ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs">{conversation.unread}</Badge>
                          )}
                        </div>
                        <Badge className={`text-xs mt-1 ${getTypeColor(conversation.type)}`}>
                          {getTypeLabel(conversation.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone de conversation */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConv ? (
              <>
                {/* Header de la conversation */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedConv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {selectedConv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{selectedConv.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedConv.online ? "En ligne" : "Hors ligne"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Zone de saisie */}
                <div className="border-t p-4">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={1}
                        className="resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8" />
                  </div>
                  <p>Sélectionnez une conversation pour commencer</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
