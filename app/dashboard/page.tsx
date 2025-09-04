"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Star, User, Settings, Heart, MessageCircle } from "lucide-react"

const mockReservations = [
  {
    id: 1,
    title: "Villa Océane - Biarritz",
    image: "/placeholder.svg?height=200&width=300",
    dates: "15-22 Juillet 2024",
    status: "confirmed",
    price: 3150,
    guests: 4,
    location: "Biarritz, France",
  },
  {
    id: 2,
    title: "Chalet Montagne - Chamonix",
    image: "/placeholder.svg?height=200&width=300",
    dates: "10-17 Août 2024",
    status: "pending",
    price: 2660,
    guests: 6,
    location: "Chamonix, France",
  },
  {
    id: 3,
    title: "Appartement Design - Lyon",
    image: "/placeholder.svg?height=200&width=300",
    dates: "5-8 Juin 2024",
    status: "completed",
    price: 660,
    guests: 2,
    location: "Lyon, France",
  },
]

const mockFavorites = [
  {
    id: 1,
    title: "Villa Méditerranée",
    location: "Nice, France",
    price: 380,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Loft Parisien",
    location: "Paris, France",
    price: 250,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("reservations")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmée</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tableau de bord</h1>
          <p className="text-gray-600 dark:text-gray-300">Gérez vos réservations et votre profil</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Réservations actives</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Séjours terminés</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Favoris</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Messages</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                </div>
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="favorites">Favoris</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes réservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <img
                        src={reservation.image || "/placeholder.svg"}
                        alt={reservation.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reservation.title}</h3>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {reservation.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {reservation.dates}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {reservation.guests} voyageurs
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">{reservation.price}€</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Voir détails
                            </Button>
                            {reservation.status === "confirmed" && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Modifier
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes favoris</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockFavorites.map((favorite) => (
                    <Card key={favorite.id} className="overflow-hidden">
                      <img
                        src={favorite.image || "/placeholder.svg"}
                        alt={favorite.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{favorite.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <MapPin className="h-4 w-4" />
                          {favorite.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{favorite.rating}</span>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-white">{favorite.price}€/nuit</span>
                        </div>
                        <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">Voir détails</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jean Dupont</h3>
                    <p className="text-gray-600 dark:text-gray-300">jean.dupont@email.com</p>
                    <Badge variant="secondary">Membre depuis 2023</Badge>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Modifier le profil</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Paramètres du compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Notifications par email</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Recevoir les confirmations et rappels</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activer
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Notifications push</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Alertes sur votre appareil</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Confidentialité</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Gérer vos données personnelles</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
