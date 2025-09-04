"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Heart, Wifi, Car, Waves, Users } from "lucide-react"

interface SearchResultsProps {
  filters: any
}

const mockResidences = [
  {
    id: 1,
    title: "Villa Océane - Vue mer panoramique",
    location: "Biarritz, France",
    price: 450,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Parking", "Piscine"],
    category: "Luxe",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: 2,
    title: "Chalet Montagne - Spa privé",
    location: "Chamonix, France",
    price: 380,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Spa", "Cheminée"],
    category: "Nature",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 3,
    title: "Appartement Design - Centre historique",
    location: "Lyon, France",
    price: 220,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Climatisation", "Balcon"],
    category: "Urbain",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: 4,
    title: "Maison de campagne - Vignobles",
    location: "Bordeaux, France",
    price: 320,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Jardin", "Barbecue"],
    category: "Nature",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
]

export function SearchResults({ filters }: SearchResultsProps) {
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      {/* Header avec tri */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mockResidences.length} résidences trouvées
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{filters.location && `à ${filters.location}`}</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Pertinence</SelectItem>
            <SelectItem value="price-low">Prix croissant</SelectItem>
            <SelectItem value="price-high">Prix décroissant</SelectItem>
            <SelectItem value="rating">Note</SelectItem>
            <SelectItem value="reviews">Nombre d'avis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Résultats */}
      <div className="grid grid-cols-1 gap-6">
        {mockResidences.map((residence) => (
          <Card key={residence.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <img
                  src={residence.image || "/placeholder.svg"}
                  alt={residence.title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(residence.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(residence.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
                <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">{residence.category}</Badge>
              </div>

              <CardContent className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{residence.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{residence.location}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{residence.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({residence.reviews} avis)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{residence.price}€</div>
                    <div className="text-sm text-gray-500">par nuit</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {residence.guests} voyageurs
                  </div>
                  <div>{residence.bedrooms} chambres</div>
                  <div>{residence.bathrooms} salles de bain</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {residence.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity === "Wifi" && <Wifi className="h-3 w-3 mr-1" />}
                      {amenity === "Parking" && <Car className="h-3 w-3 mr-1" />}
                      {amenity === "Piscine" && <Waves className="h-3 w-3 mr-1" />}
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Voir les détails</Button>
                  <Button variant="outline" className="flex-1">
                    Réserver maintenant
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Précédent
          </Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Suivant</Button>
        </div>
      </div>
    </div>
  )
}
