"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Heart, Search, Filter, Users, Wifi, Car, Waves } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

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
  {
    id: 5,
    title: "Loft Moderne - Quartier artistique",
    location: "Marseille, France",
    price: 280,
    rating: 4.5,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Terrasse", "Parking"],
    category: "Urbain",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: 6,
    title: "Villa Tropicale - Plage privée",
    location: "Martinique, France",
    price: 650,
    rating: 4.9,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Plage privée", "Piscine", "Wifi"],
    category: "Tropical",
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
  },
  {
    id: 7,
    title: "Chalet Alpin - Vue montagne",
    location: "Annecy, France",
    price: 420,
    rating: 4.8,
    reviews: 134,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Cheminée", "Spa"],
    category: "Montagne",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: 8,
    title: "Penthouse Luxe - Centre-ville",
    location: "Nice, France",
    price: 580,
    rating: 4.9,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Terrasse", "Concierge"],
    category: "Luxe",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 9,
    title: "Maison Familiale - Jardin privé",
    location: "Toulouse, France",
    price: 190,
    rating: 4.4,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Jardin", "Parking"],
    category: "Familial",
    guests: 8,
    bedrooms: 4,
    bathrooms: 2,
  },
]

const ITEMS_PER_PAGE = 6

export default function ResidencesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [filterCategory, setFilterCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])

  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  useEffect(() => {
    if (categoryFromUrl) {
      setFilterCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filteredResidences = mockResidences
    .filter((residence) => {
      const matchesSearch =
        residence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        residence.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        filterCategory === "all" || residence.category.toLowerCase() === filterCategory.toLowerCase()
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
        case "reviews":
          return b.reviews - a.reviews
        case "relevance":
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(filteredResidences.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedResidences = filteredResidences.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Toutes les résidences</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Découvrez notre collection complète de {mockResidences.length} résidences exceptionnelles
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou destination..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={filterCategory}
              onValueChange={(value) => {
                setFilterCategory(value)
                setCurrentPage(1)
              }}
            >
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
                <SelectItem value="familial">Familial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
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

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {filteredResidences.length} résidence{filteredResidences.length > 1 ? "s" : ""} trouvée
              {filteredResidences.length > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Page {currentPage} sur {totalPages}
            </p>
          </div>
        </div>

        {/* Grille des résidences */}
        {paginatedResidences.length === 0 ? (
          <Card className="p-12 text-center">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucune résidence trouvée</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilterCategory("all")
                setCurrentPage(1)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Effacer les filtres
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedResidences.map((residence) => (
              <Card key={residence.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={residence.image || "/placeholder.svg"}
                    alt={residence.title}
                    className="w-full h-64 object-cover"
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
                  <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                    {residence.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {residence.title}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{residence.location}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{residence.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({residence.reviews} avis)</span>
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
                    {residence.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity === "Wifi" && <Wifi className="h-3 w-3 mr-1" />}
                        {amenity === "Parking" && <Car className="h-3 w-3 mr-1" />}
                        {amenity === "Piscine" && <Waves className="h-3 w-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{residence.price}€</span>
                      <span className="text-gray-500 text-sm ml-1">/ nuit</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href={`/residence/${residence.id}`}>Voir détails</Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/booking/${residence.id}`}>Réserver</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Précédent
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
