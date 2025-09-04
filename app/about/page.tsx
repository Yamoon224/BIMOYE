import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Award,
  Globe,
  Heart,
  Shield,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
} from "lucide-react"

const stats = [
  { label: "Résidences", value: "1000+", icon: Globe },
  { label: "Clients satisfaits", value: "50k+", icon: Users },
  { label: "Pays", value: "25", icon: Globe },
  { label: "Note moyenne", value: "4.8/5", icon: Star },
]

const values = [
  {
    icon: Heart,
    title: "Passion du voyage",
    description: "Nous partageons votre passion pour la découverte et l'aventure.",
  },
  {
    icon: Shield,
    title: "Confiance et sécurité",
    description: "Toutes nos résidences sont vérifiées et sécurisées pour votre tranquillité.",
  },
  {
    icon: Award,
    title: "Excellence du service",
    description: "Notre équipe s'engage à vous offrir une expérience exceptionnelle.",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Rejoignez une communauté de voyageurs partageant les mêmes valeurs.",
  },
]

const team = [
  {
    name: "Moussa TOURE",
    role: "PDG",
    image: "https://groupmafamo.com/images/team/ceo.webp",
    description:
      "Leader visionnaire avec plus de 15 ans d'expérience dans l'industrie du tourisme et de l'hospitalité.",
  },
  {
    name: "Yamoussa KEITA",
    role: "PDG Assistant",
    image: "https://groupmafamo.com/images/team/assistant.webp",
    description:
      "Expert en gestion opérationnelle, il coordonne les activités quotidiennes et assure la qualité de service.",
  },
  {
    name: "Mme TOURE Fatoumata Djalamba FADIGA",
    role: "Présidente Conseil d'Administration",
    image: "https://groupmafamo.com/images/team/pca.webp",
    description: "Dirigeante expérimentée qui guide la stratégie et la vision à long terme de l'entreprise.",
  },
  {
    name: "Ibrahim BANGOURA",
    role: "Directeur Général",
    image: "https://groupmafamo.com/images/team/manager.webp",
    description: "Responsable de la gestion globale des opérations et du développement commercial de l'entreprise.",
  },
  {
    name: "Maïmouna CAMARA",
    role: "Secrétaire / Comptable",
    image: "https://groupmafamo.com/images/team/secretary.webp",
    description: "Gère les aspects administratifs et financiers avec rigueur et professionnalisme.",
  },
]

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@mafamo.com",
    description: "Réponse sous 24h",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 1 23 45 67 89",
    description: "Lun-Ven 9h-18h",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "123 Rue de la Paix, 75001 Paris",
    description: "France",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun-Ven 9h-18h",
    description: "Sam 10h-16h",
  },
]

const faqItems = [
  {
    question: "Comment puis-je modifier ma réservation ?",
    answer: "Vous pouvez modifier votre réservation depuis votre tableau de bord jusqu'à 48h avant votre arrivée.",
  },
  {
    question: "Quelle est la politique d'annulation ?",
    answer:
      "L'annulation gratuite est possible jusqu'à 7 jours avant votre séjour. Au-delà, des frais peuvent s'appliquer.",
  },
  {
    question: "Les animaux sont-ils acceptés ?",
    answer:
      "Cela dépend de chaque résidence. Vous pouvez filtrer les résidences acceptant les animaux lors de votre recherche.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">À propos de Mafamo</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Nous créons des expériences de voyage inoubliables en connectant les voyageurs avec des résidences
            exceptionnelles dans le monde entier.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Notre histoire</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/placeholder.svg?height=400&width=600" alt="Notre équipe" className="rounded-lg shadow-lg" />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Fondée en 2020 par une équipe de passionnés de voyage, Mafamo est née d'une vision simple : rendre les
                  voyages exceptionnels accessibles à tous.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Nous avons commencé avec quelques résidences en France et nous sommes maintenant présents dans 25
                  pays, offrant plus de 1000 résidences soigneusement sélectionnées.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Notre mission est de créer des connexions authentiques entre les voyageurs et les destinations, tout
                  en soutenant les communautés locales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Nos valeurs</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ces valeurs guident chacune de nos décisions et façonnent l'expérience que nous offrons.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Notre équipe</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Rencontrez les personnes passionnées qui rendent Mafamo possible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contactez-nous</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question ou assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Envoyez-nous un message
                  </h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" placeholder="Votre nom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="votre@email.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type de demande</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de demande" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reservation">Question sur une réservation</SelectItem>
                          <SelectItem value="technical">Problème technique</SelectItem>
                          <SelectItem value="billing">Facturation</SelectItem>
                          <SelectItem value="partnership">Partenariat</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" placeholder="Résumé de votre demande" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Décrivez votre demande en détail..." rows={6} required />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations de contact et FAQ */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informations de contact</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const IconComponent = info.icon
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{info.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                            <p className="text-sm text-gray-500">{info.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ rapide */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Questions fréquentes
                  </h3>
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{item.question}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Avis clients */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Ce que disent nos clients
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        "Service client exceptionnel ! Réponse rapide et solution efficace."
                      </p>
                      <p className="text-xs text-gray-500">- Marie L.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à vivre l'expérience Mafamo ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers de voyageurs qui ont déjà découvert nos résidences exceptionnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Découvrir nos résidences
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
