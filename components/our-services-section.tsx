"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-context"
import { Home, MapPin, Shield, Headphones, CreditCard, Calendar, Star, Users } from "lucide-react"

const services = [
  {
    icon: Home,
    titleKey: "services.premiumSelection",
    descriptionFr: "Résidences soigneusement sélectionnées et vérifiées pour garantir la qualité et le confort.",
    descriptionEn: "Carefully selected and verified residences to guarantee quality and comfort.",
    features: ["Inspection qualité", "Photos professionnelles", "Descriptions détaillées"],
    featuresEn: ["Quality inspection", "Professional photos", "Detailed descriptions"],
  },
  {
    icon: MapPin,
    titleKey: "services.exclusiveDestinations",
    descriptionFr: "Accès à des propriétés uniques dans les plus belles destinations du monde.",
    descriptionEn: "Access to unique properties in the world's most beautiful destinations.",
    features: ["Emplacements privilégiés", "Vues exceptionnelles", "Proximité attractions"],
    featuresEn: ["Prime locations", "Exceptional views", "Near attractions"],
  },
  {
    icon: Shield,
    titleKey: "services.secureBooking",
    descriptionFr: "Système de réservation sécurisé avec protection complète de vos données.",
    descriptionEn: "Secure booking system with complete protection of your data.",
    features: ["Paiement sécurisé", "Assurance voyage", "Garantie satisfaction"],
    featuresEn: ["Secure payment", "Travel insurance", "Satisfaction guarantee"],
  },
  {
    icon: Headphones,
    titleKey: "services.support247",
    descriptionFr: "Équipe de support disponible 24h/24 et 7j/7 pour vous accompagner.",
    descriptionEn: "Support team available 24/7 to assist you.",
    features: ["Assistance multilingue", "Réponse rapide", "Support technique"],
    featuresEn: ["Multilingual assistance", "Quick response", "Technical support"],
  },
  {
    icon: CreditCard,
    titleKey: "services.flexiblePayment",
    descriptionFr: "Options de paiement flexibles adaptées à vos besoins et préférences.",
    descriptionEn: "Flexible payment options adapted to your needs and preferences.",
    features: ["Paiement échelonné", "Devises multiples", "Annulation gratuite"],
    featuresEn: ["Installment payment", "Multiple currencies", "Free cancellation"],
  },
  {
    icon: Calendar,
    titleKey: "services.simplifiedManagement",
    descriptionFr: "Interface intuitive pour gérer facilement vos réservations et préférences.",
    descriptionEn: "Intuitive interface to easily manage your bookings and preferences.",
    features: ["Tableau de bord", "Historique complet", "Notifications automatiques"],
    featuresEn: ["Dashboard", "Complete history", "Automatic notifications"],
  },
  {
    icon: Star,
    titleKey: "services.premiumExperience",
    descriptionFr: "Services haut de gamme pour transformer votre séjour en expérience inoubliable.",
    descriptionEn: "Premium services to transform your stay into an unforgettable experience.",
    features: ["Conciergerie privée", "Services personnalisés", "Recommandations locales"],
    featuresEn: ["Private concierge", "Personalized services", "Local recommendations"],
  },
  {
    icon: Users,
    titleKey: "services.exclusiveCommunity",
    descriptionFr: "Rejoignez une communauté de voyageurs partageant la même passion pour l'excellence.",
    descriptionEn: "Join a community of travelers sharing the same passion for excellence.",
    features: ["Événements exclusifs", "Programme fidélité", "Avantages membres"],
    featuresEn: ["Exclusive events", "Loyalty program", "Member benefits"],
  },
]

export function OurServicesSection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("services.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("services.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 dark:group-hover:bg-orange-900 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t(service.titleKey)}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {language === "fr" ? service.descriptionFr : service.descriptionEn}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {(language === "fr" ? service.features : service.featuresEn).map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
          >
            {language === "fr" ? "Découvrir tous nos services" : "Discover all our services"}
          </Button>
        </div>
      </div>
    </section>
  )
}
