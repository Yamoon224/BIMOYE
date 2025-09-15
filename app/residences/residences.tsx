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
import { useLanguage } from "@/components/language-context"
import { residences } from "@/src/data/residences" // ton tableau existant

const ITEMS_PER_PAGE = 6

export default function Residences() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("relevance")
    const [filterCategory, setFilterCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [favorites, setFavorites] = useState<number[]>([])

    const searchParams = useSearchParams()
    const categoryFromUrl = searchParams.get("category")
    const { t, language } = useLanguage()


    useEffect(() => {
        if (categoryFromUrl) {
            setFilterCategory(categoryFromUrl)
        }
    }, [categoryFromUrl])

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    }

    const filteredResidences = residences
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
                        Découvrez notre collection complète de {residences.length} résidences exceptionnelles
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
                                        src={residence.images[0] || "/placeholder.svg"}
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
                                            {residence?.specs?.guests} voyageurs
                                        </div>
                                        <div>{residence?.specs?.bedrooms} chambres</div>
                                        <div>{residence?.specs?.bathrooms} salles de bain</div>
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

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {new Intl.NumberFormat('fr-FR', {
                                                    style: 'currency',
                                                    currency: 'XOF',
                                                    minimumFractionDigits: 0
                                                }).format(residence.price)}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">{t("featured.perNight")}</span>
                                        </div>
                                        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                                            <Link href={`/residence/${residence.id}`}>{t("featured.seeMore")}</Link>
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
