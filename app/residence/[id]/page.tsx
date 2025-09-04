"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Wifi,
  Car,
  Waves,
  Users,
  Bed,
  Bath,
  Home,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  MessageCircle,
  Shield,
  Coffee,
  Tv,
  Wind,
  Utensils,
} from "lucide-react"

// Données simulées pour la résidence
const residenceData = {
  id: 1,
  title: "Villa Océane - Vue mer panoramique",
  location: "Biarritz, France",
  price: 450,
  rating: 4.9,
  reviews: 127,
  category: "Luxe",
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  description:
    "Magnifique villa avec vue panoramique sur l'océan Atlantique. Cette propriété exceptionnelle offre un cadre idyllique pour vos vacances à Biarritz. Avec ses 4 chambres spacieuses et ses équipements haut de gamme, elle peut accueillir jusqu'à 8 personnes dans un confort absolu.",
  amenities: [
    { icon: Wifi, name: "WiFi gratuit" },
    { icon: Car, name: "Parking privé" },
    { icon: Waves, name: "Piscine privée" },
    { icon: Coffee, name: "Machine à café" },
    { icon: Tv, name: "TV écran plat" },
    { icon: Wind, name: "Climatisation" },
    { icon: Utensils, name: "Cuisine équipée" },
    { icon: Shield, name: "Coffre-fort" },
  ],
  specs: {
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
  },
  host: {
    name: "Marie Dubois",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    reviews: 89,
    responseTime: "1 heure",
    languages: ["Français", "Anglais", "Espagnol"],
    verified: true,
  },
  rules: [
    "Arrivée : 15h00 - 20h00",
    "Départ : avant 11h00",
    "Non fumeur",
    "Animaux non autorisés",
    "Pas de fêtes ou événements",
    "Âge minimum : 25 ans",
  ],
  location_details: {
    address: "123 Avenue de la Plage, 64200 Biarritz",
    nearby: [
      { name: "Plage de Biarritz", distance: "2 min à pied" },
      { name: "Centre-ville", distance: "5 min en voiture" },
      { name: "Aéroport", distance: "15 min en voiture" },
      { name: "Gare SNCF", distance: "10 min en voiture" },
    ],
  },
}

const mockReviews = [
  {
    id: 1,
    user: "Sophie L.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "Mars 2024",
    comment:
      "Villa absolument magnifique avec une vue à couper le souffle ! L'équipement est parfait et Marie est une hôte exceptionnelle. Nous reviendrons sans hésiter !",
  },
  {
    id: 2,
    user: "Thomas M.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "Février 2024",
    comment:
      "Séjour parfait en famille. La villa est spacieuse, très bien équipée et idéalement située. La piscine était un plus apprécié par les enfants.",
  },
  {
    id: 3,
    user: "Claire R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "Janvier 2024",
    comment:
      "Très belle propriété, conforme aux photos. Quelques petits détails à améliorer mais dans l'ensemble un excellent séjour.",
  },
]

export default function ResidenceDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % residenceData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + residenceData.images.length) % residenceData.images.length)
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights * residenceData.price
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{residenceData.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{residenceData.rating}</span>
                  <span>({residenceData.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{residenceData.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                Sauvegarder
              </Button>
            </div>
          </div>
          <Badge className="bg-orange-500 hover:bg-orange-600">{residenceData.category}</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galerie d'images */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={residenceData.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${residenceData.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {residenceData.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Informations principales */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Hébergement entier - Villa
                    </h2>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{residenceData.specs.guests} voyageurs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{residenceData.specs.bedrooms} chambres</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{residenceData.specs.bathrooms} salles de bain</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>{residenceData.specs.area}m²</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{residenceData.price}€</div>
                    <div className="text-sm text-gray-500">par nuit</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{residenceData.description}</p>
              </CardContent>
            </Card>

            {/* Équipements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Équipements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {residenceData.amenities.map((amenity, index) => {
                    const IconComponent = amenity.icon
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">{amenity.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Onglets pour plus d'informations */}
            <Tabs defaultValue="reviews" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reviews">Avis ({residenceData.reviews})</TabsTrigger>
                <TabsTrigger value="location">Emplacement</TabsTrigger>
                <TabsTrigger value="rules">Règlement</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{review.user}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emplacement</h3>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">{residenceData.location_details.address}</p>
                      <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="h-12 w-12 mx-auto mb-2" />
                          <p>Carte interactive</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">À proximité</h4>
                        <div className="space-y-2">
                          {residenceData.location_details.nearby.map((place, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-300">{place.name}</span>
                              <span className="text-sm text-gray-500">{place.distance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rules">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Règlement intérieur</h3>
                    <div className="space-y-3">
                      {residenceData.rules.map((rule, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar de réservation */}
          <div className="space-y-6">
            {/* Carte de réservation */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{residenceData.price}€</div>
                  <div className="text-sm text-gray-500">par nuit</div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Arrivée</label>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? checkIn.toLocaleDateString("fr-FR") : "Date"}
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Départ</label>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? checkOut.toLocaleDateString("fr-FR") : "Date"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Voyageurs</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 voyageur</SelectItem>
                        <SelectItem value="2">2 voyageurs</SelectItem>
                        <SelectItem value="3">3 voyageurs</SelectItem>
                        <SelectItem value="4">4 voyageurs</SelectItem>
                        <SelectItem value="5">5 voyageurs</SelectItem>
                        <SelectItem value="6">6 voyageurs</SelectItem>
                        <SelectItem value="7">7 voyageurs</SelectItem>
                        <SelectItem value="8">8 voyageurs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {checkIn && checkOut && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {residenceData.price}€ ×{" "}
                          {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nuits
                        </span>
                        <span>{calculateTotal()}€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Frais de service</span>
                        <span>{Math.round(calculateTotal() * 0.1)}€</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total</span>
                        <span>{calculateTotal() + Math.round(calculateTotal() * 0.1)}€</span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                    Réserver maintenant
                  </Button>

                  <p className="text-xs text-gray-500 text-center">Vous ne serez pas débité pour le moment</p>
                </div>
              </CardContent>
            </Card>

            {/* Informations sur l'hôte */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Votre hôte</h3>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={residenceData.host.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{residenceData.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {residenceData.host.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{residenceData.host.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{residenceData.host.rating}</span>
                      <span className="text-sm text-gray-500">({residenceData.host.reviews} avis)</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p>Répond en {residenceData.host.responseTime}</p>
                      <p>Langues : {residenceData.host.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter l'hôte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
