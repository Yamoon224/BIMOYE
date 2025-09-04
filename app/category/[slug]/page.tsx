"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Heart, Users, Bed, Bath, Home, Search, Grid, List, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// Données simulées pour les résidences de la catégorie
const categoryResidences = [
  {
    id: 1,
    title: "Villa Océane - Vue mer panoramique",
    location: "Biarritz, France",
    price: 450,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=300&width=400",
    specs: { guests: 8, bedrooms: 4, bathrooms: 3, area: 180 },
    amenities: ["WiFi", "Piscine", "Parking"],
  },
  {
    id: 2,
    title: "Château de Versailles Suite",
    location: "Versailles, France",
    price: 680,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    specs: { guests: 6, bedrooms: 3, bathrooms: 2, area: 150 },
    amenities: ["WiFi", "Spa", "Conciergerie"],
  },
  {
    id: 3,
    title: "Penthouse Monaco",
    location: "Monaco",
    price: 1200,
    rating: 5.0,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=400",
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, area: 120 },
    amenities: ["WiFi", "Terrasse", "Vue mer"],
  },
  {
    id: 4,
    title: "Villa Toscane",
    location: "Florence, Italie",
    price: 380,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    specs: { guests: 10, bedrooms: 5, bathrooms: 4, area: 220 },
    amenities: ["WiFi", "Piscine", "Jardin"],
  },
  {
    id: 5,
    title: "Loft Parisien",
    location: "Paris, France",
    price: 320,
    rating: 4.6,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    specs: { guests: 4, bedrooms: 2, bathrooms: 1, area: 85 },
    amenities: ["WiFi", "Climatisation", "Ascenseur"],
  },
  {
    id: 6,
    title: "Villa Côte d'Azur",
    location: "Nice, France",
    price: 520,
    rating: 4.9,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=400",
    specs: { guests: 8, bedrooms: 4, bathrooms: 3, area: 160 },
    amenities: ["WiFi", "Piscine", "Vue mer"],
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("price-asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [guestCount, setGuestCount] = useState("all")

  const categoryName = params.slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const filteredResidences = categoryResidences.filter((residence) => {
    const matchesSearch =
      residence.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      residence.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "0-300" && residence.price <= 300) ||
      (priceRange === "300-600" && residence.price > 300 && residence.price <= 600) ||
      (priceRange === "600+" && residence.price > 600)

    const matchesGuests =
      guestCount === "all" ||
      (guestCount === "1-4" && residence.specs.guests <= 4) ||
      (guestCount === "5-8" && residence.specs.guests > 4 && residence.specs.guests <= 8) ||
      (guestCount === "9+" && residence.specs.guests > 8)

    return matchesSearch && matchesPrice && matchesGuests
  })

  const sortedResidences = [...filteredResidences].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Catégorie : {categoryName}</h1>
          <p className="text-gray-600 dark:text-gray-300">{filteredResidences.length} résidences disponibles</p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une résidence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Prix par nuit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="0-300">0€ - 300€</SelectItem>
                <SelectItem value="300-600">300€ - 600€</SelectItem>
                <SelectItem value="600+">600€+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={guestCount} onValueChange={setGuestCount}>
              <SelectTrigger>
                <SelectValue placeholder="Voyageurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="1-4">1-4 voyageurs</SelectItem>
                <SelectItem value="5-8">5-8 voyageurs</SelectItem>
                <SelectItem value="9+">9+ voyageurs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="reviews">Nombre d'avis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres avancés
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedResidences.map((residence) => (
            <Card key={residence.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              {viewMode === "grid" ? (
                <>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={residence.image || "/placeholder.svg"}
                      alt={residence.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button variant="outline" size="sm" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge className="absolute top-3 left-3 bg-orange-500">Luxe</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{residence.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{residence.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3 text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{residence.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{residence.specs.guests}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{residence.specs.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{residence.specs.bathrooms}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">{residence.price}€</span>
                        <span className="text-sm text-gray-500"> / nuit</span>
                      </div>
                      <Link href={`/residence/${residence.id}`}>
                        <Button size="sm">Voir détails</Button>
                      </Link>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-48 h-32 relative overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={residence.image || "/placeholder.svg"}
                        alt={residence.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{residence.title}</h3>
                          <div className="flex items-center gap-1 mb-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{residence.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{residence.rating}</span>
                          <span className="text-sm text-gray-500">({residence.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{residence.specs.guests} voyageurs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{residence.specs.bedrooms} chambres</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{residence.specs.bathrooms} salles de bain</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          <span>{residence.specs.area}m²</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {residence.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{residence.price}€</span>
                            <span className="text-sm text-gray-500"> / nuit</span>
                          </div>
                          <Link href={`/residence/${residence.id}`}>
                            <Button size="sm">Voir détails</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-12 gap-2">
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
