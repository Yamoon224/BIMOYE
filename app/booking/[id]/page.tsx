"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Users,
  Bed,
  CalendarIcon,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Données simulées pour la résidence
const residenceData = {
  id: 1,
  title: "Villa Océane - Vue mer panoramique",
  location: "Biarritz, France",
  price: 450,
  rating: 4.9,
  reviews: 127,
  category: "Luxe",
  image: "/placeholder.svg?height=300&width=400",
  specs: {
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
  },
  host: {
    name: "Marie Dubois",
    avatar: "/placeholder.svg?height=60&width=60",
  },
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const [checkIn, setCheckIn] = useState("2024-06-15")
  const [checkOut, setCheckOut] = useState("2024-06-20")
  const [guests, setGuests] = useState("4")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const calculateNights = () => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = nights * residenceData.price
  const serviceFee = Math.round(subtotal * 0.1)
  const taxes = Math.round(subtotal * 0.05)
  const total = subtotal + serviceFee + taxes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/residence/${params.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux détails
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Finaliser votre réservation</h1>
          <p className="text-gray-600 dark:text-gray-300">Vous êtes à quelques étapes de votre séjour de rêve</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations de voyage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Votre voyage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin">Date d'arrivée</Label>
                    <Input id="checkin" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Date de départ</Label>
                    <Input id="checkout" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="guests">Nombre de voyageurs</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 voyageur</SelectItem>
                      <SelectItem value="2">2 voyageurs</SelectItem>
                      <SelectItem value="3">3 voyageurs</SelectItem>
                      <SelectItem value="4">4 voyageurs</SelectItem>
                      <SelectItem value="5">5 voyageurs</SelectItem>
                      <SelectItem value="6">6 voyageurs</SelectItem>
                      <SelectItem value="7">7 voyageurs</SelectItem>
                      <SelectItem value="8">8 voyageurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Vos informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message à l'hôte (optionnel)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Dites bonjour à votre hôte et mentionnez l'heure d'arrivée prévue..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Méthode de paiement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Carte bancaire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input id="cardName" placeholder="Nom complet" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Politique d'annulation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Annulation gratuite jusqu'à 48h avant l'arrivée. Après cette période, 50% du montant sera
                        retenu.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Paiement sécurisé</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Vos informations de paiement sont protégées par un cryptage SSL de niveau bancaire.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résumé de la réservation */}
          <div className="space-y-6">
            {/* Détails de la résidence */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-6">
                  <img
                    src={residenceData.image || "/placeholder.svg"}
                    alt={residenceData.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{residenceData.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{residenceData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{residenceData.rating}</span>
                      <span className="text-sm text-gray-500">({residenceData.reviews} avis)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{guests} voyageurs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{residenceData.specs.bedrooms} chambres</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Arrivée :</span>
                      <span>{new Date(checkIn).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Départ :</span>
                      <span>{new Date(checkOut).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée :</span>
                      <span>
                        {nights} nuit{nights > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Détails du prix */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      {residenceData.price}€ × {nights} nuits
                    </span>
                    <span>{subtotal}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frais de service</span>
                    <span>{serviceFee}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>{taxes}€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{total}€</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmer la réservation
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  En confirmant, vous acceptez nos conditions générales et notre politique de confidentialité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
