"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Header
    "nav.categories": "Catégories",
    "nav.allResidences": "Toutes les résidences",
    "nav.about": "À propos",
    "nav.myAccount": "Mon compte",
    "nav.dashboard": "Tableau de bord",
    "nav.messages": "Messages",
    "nav.profile": "Profil",
    "nav.login": "Se connecter",

    // Hero Section
    "hero.title": "Découvrez des résidences",
    "hero.subtitle": "exceptionnelles",
    "hero.description":
      "Réservez votre séjour parfait parmi notre sélection de résidences de luxe dans les plus belles destinations.",
    "hero.destination": "Destination",
    "hero.destinationPlaceholder": "Où souhaitez-vous aller ?",
    "hero.checkin": "Arrivée",
    "hero.checkout": "Départ",
    "hero.guests": "Voyageurs",
    "hero.search": "Rechercher",
    "hero.selectDate": "Sélectionner",

    // Featured Residences
    "featured.title": "Résidences en vedette",
    "featured.description":
      "Découvrez notre sélection de résidences exceptionnelles, choisies pour leur qualité et leur emplacement unique.",
    "featured.seeMore": "Voir plus",
    "featured.seeAll": "Voir toutes les résidences",
    "featured.perNight": "/ nuit",
    "featured.reviews": "avis",

    // Categories
    "categories.title": "Catégories populaires",
    "categories.description":
      "Explorez nos différentes catégories de résidences pour trouver le séjour qui vous correspond.",
    "categories.beachfront": "Bord de mer",
    "categories.mountain": "Montagne",
    "categories.luxury": "Luxe",
    "categories.urban": "Urbain",
    "categories.nature": "Nature",
    "categories.tropical": "Tropical",
    "categories.residences": "résidences",

    // Services
    "services.title": "Nos services",
    "services.description":
      "Découvrez l'ensemble de nos services conçus pour vous offrir une expérience de voyage exceptionnelle.",
    "services.premiumSelection": "Sélection Premium",
    "services.exclusiveDestinations": "Destinations Exclusives",
    "services.secureBooking": "Réservation Sécurisée",
    "services.support247": "Support 24/7",
    "services.flexiblePayment": "Paiement Flexible",
    "services.simplifiedManagement": "Gestion Simplifiée",
    "services.premiumExperience": "Expérience Premium",
    "services.exclusiveCommunity": "Communauté Exclusive",

    // Team
    "team.title": "Notre équipe",
    "team.description": "Rencontrez les experts passionnés qui rendent vos expériences de voyage exceptionnelles.",

    // CTA
    "cta.title": "Prêt à vivre une expérience inoubliable ?",
    "cta.description":
      "Rejoignez des milliers de voyageurs qui ont déjà découvert nos résidences exceptionnelles. Votre prochaine aventure vous attend.",
    "cta.explore": "Explorez les résidences",
    "cta.learnMore": "En savoir plus",

    // Common
    "common.guests": "voyageurs",
    "common.bedrooms": "chambres",
    "common.bathrooms": "salles de bain",
    "common.book": "Réserver",
    "common.bookNow": "Réserver maintenant",
    "common.viewDetails": "Voir détails",
    "common.contact": "Contact",
    "common.loading": "Chargement...",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.previous": "Précédent",
    "common.next": "Suivant",
    "common.page": "Page",
    "common.of": "sur",
  },
  en: {
    // Header
    "nav.categories": "Categories",
    "nav.allResidences": "All Residences",
    "nav.about": "About",
    "nav.myAccount": "My Account",
    "nav.dashboard": "Dashboard",
    "nav.messages": "Messages",
    "nav.profile": "Profile",
    "nav.login": "Sign In",

    // Hero Section
    "hero.title": "Discover exceptional",
    "hero.subtitle": "residences",
    "hero.description":
      "Book your perfect stay from our selection of luxury residences in the most beautiful destinations.",
    "hero.destination": "Destination",
    "hero.destinationPlaceholder": "Where would you like to go?",
    "hero.checkin": "Check-in",
    "hero.checkout": "Check-out",
    "hero.guests": "Guests",
    "hero.search": "Search",
    "hero.selectDate": "Select",

    // Featured Residences
    "featured.title": "Featured Residences",
    "featured.description":
      "Discover our selection of exceptional residences, chosen for their quality and unique location.",
    "featured.seeMore": "See more",
    "featured.seeAll": "See all residences",
    "featured.perNight": "/ night",
    "featured.reviews": "reviews",

    // Categories
    "categories.title": "Popular Categories",
    "categories.description": "Explore our different categories of residences to find the stay that suits you.",
    "categories.beachfront": "Beachfront",
    "categories.mountain": "Mountain",
    "categories.luxury": "Luxury",
    "categories.urban": "Urban",
    "categories.nature": "Nature",
    "categories.tropical": "Tropical",
    "categories.residences": "residences",

    // Services
    "services.title": "Our Services",
    "services.description": "Discover all our services designed to offer you an exceptional travel experience.",
    "services.premiumSelection": "Premium Selection",
    "services.exclusiveDestinations": "Exclusive Destinations",
    "services.secureBooking": "Secure Booking",
    "services.support247": "24/7 Support",
    "services.flexiblePayment": "Flexible Payment",
    "services.simplifiedManagement": "Simplified Management",
    "services.premiumExperience": "Premium Experience",
    "services.exclusiveCommunity": "Exclusive Community",

    // Team
    "team.title": "Our Team",
    "team.description": "Meet the passionate experts who make your travel experiences exceptional.",

    // CTA
    "cta.title": "Ready for an unforgettable experience?",
    "cta.description":
      "Join thousands of travelers who have already discovered our exceptional residences. Your next adventure awaits.",
    "cta.explore": "Explore residences",
    "cta.learnMore": "Learn more",

    // Common
    "common.guests": "guests",
    "common.bedrooms": "bedrooms",
    "common.bathrooms": "bathrooms",
    "common.book": "Book",
    "common.bookNow": "Book now",
    "common.viewDetails": "View details",
    "common.contact": "Contact",
    "common.loading": "Loading...",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.previous": "Previous",
    "common.next": "Next",
    "common.page": "Page",
    "common.of": "of",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
