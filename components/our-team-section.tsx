"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Christian YAMTCHE",
    role: "MANAGER PRINCIPALE",
    roleEn: "MANAGER",
    image: "/team/manager.webp",
    description: "Gestionnaire expérimentée guidant la vision stratégique et la gouvernance de l'entreprise.",
    descriptionEn: "Visionary leader with deep expertise in developing innovative businesses.",
    linkedin: "#",
    twitter: "#",
    email: "christian.yamtche@bimoye.com",
  },
  {
    name: "Yamoussa KEITA",
    role: "TECH LEAD & MANAGER ASSISTANT",
    roleEn: "TECH LEAD & ASSISTANT MANAGER",
    image: "https://groupmafamo.com/images/team/assistant.webp",
    description: "Lead Tech, spécialisé dans la coordination stratégique et opérationnelle.",
    descriptionEn: "CEO's right hand, specialized in strategic and operational coordination.",
    linkedin: "#",
    twitter: "#",
    email: "yamoussa.keita@bimoye.com",
  }
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
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-justify">
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
