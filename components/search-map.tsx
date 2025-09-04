"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart } from "lucide-react"

interface SearchMapProps {
  filters: any
}

const mockMapResidences = [
  {
    id: 1,
    title: "Villa Océane",
    location: "Biarritz",
    price: 450,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 43.4832, lng: -1.5586 },
  },
  {
    id: 2,
    title: "Chalet Montagne",
    location: "Chamonix",
    price: 380,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 45.9237, lng: 6.8694 },
  },
  {
    id: 3,
    title: "Appartement Design",
    location: "Lyon",
    price: 220,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 45.764, lng: 4.8357 },
  },
]

export function SearchMap({ filters }: SearchMapProps) {
  const [selectedResidence, setSelectedResidence] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="h-[600px] relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {/* Carte simulée */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <MapPin className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg font-medium">Carte interactive</p>
            <p className="text-sm">Cliquez sur les marqueurs pour voir les détails</p>
          </div>
        </div>

        {/* Marqueurs simulés */}
        {mockMapResidences.map((residence, index) => (
          <div
            key={residence.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
              index === 0 ? "top-1/4 left-1/4" : index === 1 ? "top-1/3 right-1/3" : "bottom-1/3 left-1/2"
            }`}
            onClick={() => setSelectedResidence(residence.id)}
          >
            <div
              className={`bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:bg-blue-700 transition-colors ${
                selectedResidence === residence.id ? "ring-2 ring-orange-400" : ""
              }`}
            >
              {residence.price}€
            </div>
          </div>
        ))}
      </div>

      {/* Panneau de détails */}
      {selectedResidence && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          {mockMapResidences
            .filter((r) => r.id === selectedResidence)
            .map((residence) => (
              <Card key={residence.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={residence.image || "/placeholder.svg"}
                      alt={residence.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <CardContent className="w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{residence.title}</h3>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {residence.location}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleFavorite(residence.id)}>
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(residence.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{residence.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">{residence.price}€/nuit</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Voir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
        </div>
      )}

      {/* Contrôles de la carte */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="sm" className="bg-white">
          +
        </Button>
        <Button variant="outline" size="sm" className="bg-white">
          -
        </Button>
      </div>
    </div>
  )
}
