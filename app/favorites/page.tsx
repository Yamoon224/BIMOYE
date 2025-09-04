"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Heart, Search, Filter, Calendar, Users } from "lucide-react"

const mockFavorites = [
  {
    id: 1,
    title: "Villa Méditerranée - Vue mer",
    location: "Nice, France",
    price: 380,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    category: "Luxe",
    amenities: ["Piscine", "Wifi", "Parking"],
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    title: "Loft Parisien - Centre historique",
    location: "Paris, France",
    price: 250,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    category: "Urbain",
    amenities: ["Wifi", "Climatisation", "Balcon"],
    dateAdded: "2024-01-10",
  },
  {
    id: 3,
    title: "Chalet Alpin - Spa privé",
    location: "Annecy, France",
    price: 420,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    category: "Montagne",
    amenities: ["Spa", "Cheminée", "Wifi"],
    dateAdded: "2024-01-08",
  },
  {
    id: 4,
    title: "Maison de campagne - Vignobles",
    location: "Bordeaux, France",
    price: 320,
    rating: 4.7,
    reviews: 134,
    image: "/placeholder.svg?height=300&width=400",
    category: "Nature",
    amenities: ["Jardin", "Barbecue", "Wifi"],
    dateAdded: "2024-01-05",
  },
  {
    id: 5,
    title: "Appartement Design - Quartier branché",
    location: "Marseille, France",
    price: 180,
    rating: 4.5,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=400",
    category: "Urbain",
    amenities: ["Wifi", "Terrasse", "Parking"],
    dateAdded: "2024-01-03",
  },
  {
    id: 6,
    title: "Villa Tropicale - Plage privée",
    location: "Martinique, France",
    price: 650,
    rating: 4.9,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=400",
    category: "Tropical",
    amenities: ["Plage privée", "Piscine", "Wifi"],
    dateAdded: "2024-01-01",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [filterCategory, setFilterCategory] = useState("all")

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  const filteredFavorites = favorites
    .filter((fav) => {
      const matchesSearch =
        fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fav.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || fav.category.toLowerCase() === filterCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mes favoris</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {favorites.length} résidence{favorites.length > 1 ? "s" : ""} sauvegardée{favorites.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher dans vos favoris..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="luxe">Luxe</SelectItem>
                <SelectItem value="urbain">Urbain</SelectItem>
                <SelectItem value="montagne">Montagne</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="tropical">Tropical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateAdded">Date d'ajout</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des favoris */}
        {filteredFavorites.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || filterCategory !== "all" ? "Aucun résultat" : "Aucun favori"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm || filterCategory !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez à explorer nos résidences et ajoutez vos préférées ici"}
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              {searchTerm || filterCategory !== "all" ? "Effacer les filtres" : "Découvrir les résidences"}
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={favorite.image || "/placeholder.svg"}
                    alt={favorite.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                  <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">{favorite.category}</Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {favorite.title}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{favorite.location}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{favorite.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({favorite.reviews} avis)</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {favorite.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{favorite.price}€</span>
                      <span className="text-gray-500 text-sm ml-1">/ nuit</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Ajouté le {new Date(favorite.dateAdded).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Voir détails</Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Actions rapides */}
        {filteredFavorites.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Prêt à réserver ?</h2>
              <p className="text-lg mb-6 opacity-90">Transformez vos favoris en souvenirs inoubliables</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Users className="h-5 w-5 mr-2" />
                  Comparer les prix
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Continuer à explorer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
