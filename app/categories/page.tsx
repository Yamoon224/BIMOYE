import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Waves, Mountain, Crown, Building, TreePine, Palmtree, Home, Tent } from "lucide-react"

const categories = [
  {
    id: 1,
    title: "Bord de mer",
    description: "Villas et appartements face à l'océan avec accès direct à la plage",
    icon: Waves,
    image: "/placeholder.svg?height=300&width=400",
    count: 156,
    priceRange: "200€ - 800€",
    features: ["Vue mer", "Accès plage", "Sports nautiques"],
  },
  {
    id: 2,
    title: "Montagne",
    description: "Chalets et refuges en altitude pour les amoureux de la nature",
    icon: Mountain,
    image: "/placeholder.svg?height=300&width=400",
    count: 89,
    priceRange: "150€ - 600€",
    features: ["Vue montagne", "Randonnée", "Ski"],
  },
  {
    id: 3,
    title: "Luxe",
    description: "Résidences haut de gamme avec services premium",
    icon: Crown,
    image: "/placeholder.svg?height=300&width=400",
    count: 67,
    priceRange: "500€ - 2000€",
    features: ["Conciergerie", "Spa", "Chef privé"],
  },
  {
    id: 4,
    title: "Urbain",
    description: "Appartements modernes en centre-ville",
    icon: Building,
    image: "/placeholder.svg?height=300&width=400",
    count: 234,
    priceRange: "100€ - 400€",
    features: ["Centre-ville", "Transports", "Restaurants"],
  },
  {
    id: 5,
    title: "Nature",
    description: "Cabanes et maisons isolées en pleine nature",
    icon: TreePine,
    image: "/placeholder.svg?height=300&width=400",
    count: 78,
    priceRange: "120€ - 350€",
    features: ["Isolement", "Faune", "Randonnée"],
  },
  {
    id: 6,
    title: "Tropical",
    description: "Villas sous les palmiers dans des destinations exotiques",
    icon: Palmtree,
    image: "/placeholder.svg?height=300&width=400",
    count: 45,
    priceRange: "300€ - 1200€",
    features: ["Climat tropical", "Plages paradisiaques", "Détente"],
  },
  {
    id: 7,
    title: "Familial",
    description: "Maisons spacieuses parfaites pour les familles",
    icon: Home,
    image: "/placeholder.svg?height=300&width=400",
    count: 123,
    priceRange: "180€ - 500€",
    features: ["Espace", "Sécurité", "Activités enfants"],
  },
  {
    id: 8,
    title: "Aventure",
    description: "Hébergements insolites pour les aventuriers",
    icon: Tent,
    image: "/placeholder.svg?height=300&width=400",
    count: 34,
    priceRange: "80€ - 250€",
    features: ["Insolite", "Aventure", "Nature sauvage"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Explorez nos catégories</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre large sélection de résidences classées par catégories pour trouver le séjour parfait selon
            vos envies et votre style de voyage.
          </p>
        </div>

        {/* Catégories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 p-2 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-200 mb-2">{category.count} résidences</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Prix: {category.priceRange}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Explorer cette catégorie</Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas votre bonheur ?</h2>
          <p className="text-lg mb-6 opacity-90">Contactez notre équipe pour des recommandations personnalisées</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Nous contacter
          </Button>
        </div>
      </div>
    </div>
  )
}
