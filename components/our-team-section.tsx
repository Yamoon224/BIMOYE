"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Moussa TOURE",
    role: "PDG",
    roleEn: "CEO",
    image: "https://groupmafamo.com/images/team/ceo.webp",
    description: "Leader visionnaire avec une expertise approfondie dans le développement d'entreprises innovantes.",
    descriptionEn: "Visionary leader with deep expertise in developing innovative businesses.",
    linkedin: "#",
    twitter: "#",
    email: "moussa@mafamo.com",
  },
  {
    name: "Yamoussa KEITA",
    role: "PDG Assistant",
    roleEn: "Assistant CEO",
    image: "https://groupmafamo.com/images/team/assistant.webp",
    description: "Bras droit du PDG, spécialisé dans la coordination stratégique et opérationnelle.",
    descriptionEn: "CEO's right hand, specialized in strategic and operational coordination.",
    linkedin: "#",
    twitter: "#",
    email: "yamoussa@mafamo.com",
  },
  {
    name: "Mme TOURE Fatoumata Djalamba FADIGA",
    role: "Présidente Conseil d'Administration",
    roleEn: "Board Chairman",
    image: "https://groupmafamo.com/images/team/pca.webp",
    description: "Présidente expérimentée guidant la vision stratégique et la gouvernance de l'entreprise.",
    descriptionEn: "Experienced chairman guiding the company's strategic vision and governance.",
    linkedin: "#",
    twitter: "#",
    email: "fatoumata@mafamo.com",
  },
  {
    name: "Ibrahim BANGOURA",
    role: "Directeur Général",
    roleEn: "General Manager",
    image: "https://groupmafamo.com/images/team/manager.webp",
    description: "Directeur général expérimenté dans la gestion opérationnelle et le développement commercial.",
    descriptionEn: "Experienced general manager in operational management and business development.",
    linkedin: "#",
    twitter: "#",
    email: "ibrahim@mafamo.com",
  },
  {
    name: "Maïmouna CAMARA",
    role: "Secrétaire / Comptable",
    roleEn: "Secretary / Accountant",
    image: "https://groupmafamo.com/images/team/secretary.webp",
    description: "Responsable de la gestion administrative et financière avec une attention particulière aux détails.",
    descriptionEn: "Responsible for administrative and financial management with particular attention to detail.",
    linkedin: "#",
    twitter: "#",
    email: "maimouna@mafamo.com",
  },
]

export function OurTeamSection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("team.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("team.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">
                  {language === "fr" ? member.role : member.roleEn}
                </Badge>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {language === "fr" ? member.description : member.descriptionEn}
                </p>
                <div className="flex gap-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-orange-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
