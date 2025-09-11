"use client"

import { useState } from "react"
import { isBefore } from "date-fns"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Wifi, Car, Waves, Users, Bed, Bath, Home, CalendarIcon, Shield, Coffee, Tv, Wind, Utensils, CalendarCheck, Facebook, Twitter, Linkedin, Share2, MessageCircle } from "lucide-react"


const residences = [
    {
        id: 1,
        title: "Résidence Luxieuse Angré CNPS",
        titleEn: "Luxury Residence, Angre CNPS",
        location: "Angré CNPS, Abidjan",
        price: 25000,
        rating: 4.9,
        reviews: 127,
        specs: {
            guests: 1,
            bedrooms: 1,
            bathrooms: 1,
            area: 180,
        },
        image: "/residences/1.png?height=300&width=400",
        amenities: ["Wifi", "Parking", "Balcon"],
        category: "Luxe",
        categoryEn: "Luxury",
    },
    {
        id: 2,
        title: "Résidence Luxieuse Angré CNPS",
        titleEn: "Luxury Residence, Angre CNPS",
        location: "Angré CNPS, Abidjan",
        price: 25000,
        rating: 4.9,
        reviews: 127,
        specs: {
            guests: 1,
            bedrooms: 1,
            bathrooms: 1,
            area: 180,
        },
        image: "/residences/2.png?height=300&width=400",
        amenities: ["Wifi", "Parking", "Climatisation"],
        category: "Luxe",
        categoryEn: "Luxury",
    }
]

export default function ResidenceDetail({ params }:) {
    const [checkIn, setCheckIn] = useState<Date>()
    const [checkOut, setCheckOut] = useState<Date>()
    const [guests, setGuests] = useState("2")
    const [openCheckIn, setOpenCheckIn] = useState(false)
    const [openCheckOut, setOpenCheckOut] = useState(false)

    params = useParams();
    const id = Number(params.id); // l'id vient de l'URL en string → conversion en number

    const residenceData = residences.find(r => r.id === id);

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // minuit aujourd'hui
        const d = new Date(date);
        d.setHours(0, 0, 0, 0); // minuit de la date à tester
        return d < today;
    };

    if (!residenceData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-700 dark:text-gray-300">Résidence introuvable</p>
            </div>
        );
    }

    const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)


    const calculateTotal = () => {
        if (!checkIn || !checkOut) return 0
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        return residenceData.price * nights
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
                {/* Contenu principal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Image */}
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <img src={residenceData.image} alt={residenceData.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Infos */}
                    <Card>
                        <CardContent className="p-6">
                            <h1 className="text-3xl font-bold">{residenceData.title}</h1>
                            <div className="flex gap-2 items-center mt-2 text-gray-600">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span>{residenceData.rating} ({residenceData.reviews} avis)</span>
                                <MapPin className="h-4 w-4 ml-4" />
                                <span>{residenceData.location}</span>
                            </div>
                            <div className="flex gap-6 mt-4">
                                <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {residenceData.specs.guests} pers</div>
                                <div className="flex items-center gap-1"><Bed className="h-4 w-4" /> {residenceData.specs.bedrooms} ch</div>
                                <div className="flex items-center gap-1"><Bath className="h-4 w-4" /> {residenceData.specs.bathrooms} sdb</div>
                                <div className="flex items-center gap-1"><Home className="h-4 w-4" /> {residenceData.specs.area} m²</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Équipements */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Équipements</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {residenceData.amenities.map((a, i) => (
                                    <div key={i} className="text-gray-700 dark:text-gray-300">{a}</div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar réservation */}
                <div className="space-y-6">
                    <Card className="sticky top-4">
                        <CardContent className="p-6">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold">{formatPrice(residenceData.price)}</div>
                                <div className="text-sm text-gray-500">par nuit</div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {/* Arrivée */}
                                <div>
                                    <label className="text-sm">Arrivée</label>
                                    <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                                <CalendarIcon className="h-4 w-4 mr-2" />
                                                {checkIn ? checkIn.toLocaleDateString("fr-FR") : "Date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start">
                                            <Calendar
                                                mode="single"
                                                selected={checkIn}
                                                onSelect={(date) => {
                                                    setCheckIn(date)
                                                    if (checkOut && date && !isBefore(date, checkOut)) setCheckOut(undefined)
                                                    setOpenCheckIn(false)
                                                }}
                                                disabled={isPastDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Départ */}
                                <div>
                                    <label className="text-sm">Départ</label>
                                    <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                                <CalendarIcon className="h-4 w-4 mr-2" />
                                                {checkOut ? checkOut.toLocaleDateString("fr-FR") : "Date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start">
                                            <Calendar
                                                mode="single"
                                                selected={checkOut}
                                                onSelect={(date) => {
                                                    setCheckOut(date)
                                                    setOpenCheckOut(false)
                                                }}
                                                disabled={(date) => !checkIn || isPastDate(date) || isBefore(date, checkIn)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            {/* Voyageurs */}
                            <div className="mb-4">
                                <label className="text-sm">Nbre Personnes</label>
                                <Select value={guests} onValueChange={setGuests}>
                                    <SelectTrigger><Users className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {[...Array(8)].map((_, i) => (
                                            <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} personne{i > 0 && "s"}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Récapitulatif */}
                            {checkIn && checkOut && (
                                <div className="border-t pt-4 mb-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{formatPrice(residenceData.price)} × {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nuit(s)</span>
                                        <span>{formatPrice(calculateTotal())}</span>
                                    </div>
                                    {/* <div className="flex justify-between">
                                        <span>Frais de service</span>
                                        <span>{formatPrice(Math.round(calculateTotal() * 0.1))}</span>
                                    </div> */}
                                    <div className="flex justify-between font-semibold border-t pt-2">
                                        <span>Total</span>
                                        <span>{formatPrice(calculateTotal())}</span>
                                    </div>
                                </div>
                            )}

                            {/* Bouton réserver */}
                            <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-orange-500"
                                onClick={() => {
                                    if (!checkIn || !checkOut) {
                                        alert("Veuillez sélectionner vos dates.")
                                        return
                                    }
                                    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
                                    const total = calculateTotal() + Math.round(calculateTotal() * 0.1)

                                    const message = `Bonjour, je suis intéressé par la réservation :
                                    - 🏠 Résidence : ${residenceData.title}
                                    - 📅 Arrivée : ${checkIn.toLocaleDateString("fr-FR")}
                                    - 📅 Départ : ${checkOut.toLocaleDateString("fr-FR")}
                                    - 👥 Nbre Personnes : ${guests}
                                    - 💵 Prix par nuit : ${formatPrice(residenceData.price)}
                                    - 🌙 Nuits : ${nights}
                                    - 🧾 Total (avec frais) : ${formatPrice(total)}

                                    Pouvez-vous me confirmer la disponibilité ?`

                                    const phoneNumber = "2250564461216"
                                    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                                }}
                            >
                                <CalendarCheck className="w-5 h-5 mr-2" />
                                Réserver maintenant
                            </Button>
                            <p className="text-xs text-center text-gray-500 mt-2">Nous vous contacterons dans les brefs délai</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
