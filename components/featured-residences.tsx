"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { Star, MapPin, Wifi, Car, Waves } from "lucide-react"
import Link from "next/link"

const featuredResidences = [
  {
    id: 1,
    title: "Villa Océane - Vue mer panoramique",
    titleEn: "Ocean Villa - Panoramic Sea View",
    location: "Biarritz, France",
    price: 450,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Parking", "Piscine"],
    category: "Luxe",
    categoryEn: "Luxury",
  },
  {
    id: 2,
    title: "Chalet Montagne - Spa privé",
    titleEn: "Mountain Chalet - Private Spa",
    location: "Chamonix, France",
    price: 380,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Spa", "Cheminée"],
    category: "Nature",
    categoryEn: "Nature",
  },
  {
    id: 3,
    title: "Appartement Design - Centre historique",
    titleEn: "Design Apartment - Historic Center",
    location: "Lyon, France",
    price: 220,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Wifi", "Climatisation", "Balcon"],
    category: "Urbain",
    categoryEn: "Urban",
  },
]

export function FeaturedResidences() {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("featured.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("featured.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResidences.map((residence) => (
            <Card key={residence.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={residence.image || "/placeholder.svg"}
                  alt={language === "fr" ? residence.title : residence.titleEn}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                  {language === "fr" ? residence.category : residence.categoryEn}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {language === "fr" ? residence.title : residence.titleEn}
                  </h3>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{residence.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{residence.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({residence.reviews} {t("featured.reviews")})
                  </span>
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

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{residence.price}€</span>
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

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8" asChild>
            <Link href="/residences">{t("featured.seeAll")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
