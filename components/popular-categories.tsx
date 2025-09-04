"use client"

import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { Waves, Mountain, Crown, Building, TreePine, Palmtree } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    title: "Bord de mer",
    titleEn: "Beachfront",
    description: "Villas et appartements face à l'océan",
    descriptionEn: "Villas and apartments facing the ocean",
    icon: Waves,
    image: "/placeholder.svg?height=200&width=300",
    count: 156,
  },
  {
    id: 2,
    title: "Montagne",
    titleEn: "Mountain",
    description: "Chalets et refuges en altitude",
    descriptionEn: "Chalets and mountain lodges",
    icon: Mountain,
    image: "/placeholder.svg?height=200&width=300",
    count: 89,
  },
  {
    id: 3,
    title: "Luxe",
    titleEn: "Luxury",
    description: "Résidences haut de gamme",
    descriptionEn: "High-end residences",
    icon: Crown,
    image: "/placeholder.svg?height=200&width=300",
    count: 67,
  },
  {
    id: 4,
    title: "Urbain",
    titleEn: "Urban",
    description: "Appartements en centre-ville",
    descriptionEn: "Downtown apartments",
    icon: Building,
    image: "/placeholder.svg?height=200&width=300",
    count: 234,
  },
  {
    id: 5,
    title: "Nature",
    titleEn: "Nature",
    description: "Cabanes et maisons isolées",
    descriptionEn: "Cabins and secluded houses",
    icon: TreePine,
    image: "/placeholder.svg?height=200&width=300",
    count: 78,
  },
  {
    id: 6,
    title: "Tropical",
    titleEn: "Tropical",
    description: "Villas sous les palmiers",
    descriptionEn: "Villas under palm trees",
    icon: Palmtree,
    image: "/placeholder.svg?height=200&width=300",
    count: 45,
  },
]

export function PopularCategories() {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("categories.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("categories.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link href={`/residences?category=${category.title.toLowerCase()}`} key={category.id}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={language === "fr" ? category.title : category.titleEn}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <IconComponent className="h-6 w-6 mr-2" />
                        <h3 className="text-xl font-semibold">
                          {language === "fr" ? category.title : category.titleEn}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-200 mb-1">
                        {language === "fr" ? category.description : category.descriptionEn}
                      </p>
                      <p className="text-xs text-gray-300">
                        {category.count} {t("categories.residences")}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
