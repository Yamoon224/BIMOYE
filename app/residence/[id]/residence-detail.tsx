"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Star, MapPin, Users, Bed, Bath, Home, CalendarIcon, CalendarCheck, Facebook, Twitter, Linkedin, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react"

interface ResidenceProps {
    data: typeof import("@/src/data/residences").residences[number]
}

export default function ResidenceDetail({ data }: ResidenceProps) {
    const [checkIn, setCheckIn] = useState<Date>()
    const [checkOut, setCheckOut] = useState<Date>()
    const [guests, setGuests] = useState("2")
    const [openCheckIn, setOpenCheckIn] = useState(false)
    const [openCheckOut, setOpenCheckOut] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const [shareUrl, setShareUrl] = useState("")
    const [shareTitle, setShareTitle] = useState("")

    useEffect(() => {
        setShareUrl(encodeURIComponent(window.location.href))
        setShareTitle(encodeURIComponent(data.title))
    }, [data])

    const isPastDate = (date: Date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        return d < today
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price)

    const calculateTotal = () => {
        if (!checkIn || !checkOut) return 0
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        return data.price * nights
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % data.images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + data.images.length) % data.images.length)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4 grid gap-6 sm:gap-8 lg:grid-cols-3">        
                {/* Contenu principal */}
                <div className="lg:col-span-2 space-y-4">
                    
                    {/* Galerie */}
                    <div className="relative">
                        <div className="aspect-square sm:aspect-video rounded-lg overflow-hidden">
                            <img
                                src={data.images[currentImageIndex] || "/placeholder.svg"}
                                alt={`${data.title} - Image ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Boutons navigation visibles seulement à partir de sm */}
                        <div className="hidden sm:block">
                            <Button
                                variant="outline"
                                size="sm"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        {/* Indicateurs */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {data.images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Infos */}
                    <Card>
                        <CardContent className="p-6">
                            <h1 className="text-2xl sm:text-3xl font-bold">{data.title}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span>{data.rating} ({data.reviews} avis)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{data.location}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {data.specs.guests} pers</div>
                                <div className="flex items-center gap-1"><Bed className="h-4 w-4" /> {data.specs.bedrooms} ch</div>
                                <div className="flex items-center gap-1"><Bath className="h-4 w-4" /> {data.specs.bathrooms} sdb</div>
                                <div className="flex items-center gap-1"><Home className="h-4 w-4" /> {data.specs.area} m²</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Équipements */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Équipements</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {data.amenities.map((a: any, i: any) => (
                                    <div key={i} className="text-gray-700 dark:text-gray-300">{a}</div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Partage */}
                    <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                        {/* ... tes boutons */}
                        <Button variant="outline" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank")}>
                            <Facebook className="w-4 h-4 mr-1" /> Facebook
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, "_blank")}>
                            <Twitter className="w-4 h-4 mr-1" /> Twitter
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`https://wa.me/?text=${shareTitle}%20${shareUrl}`, "_blank")}>
                            <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`, "_blank")}>
                            <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                        </Button>        
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-4">
                    <Card>
                        {/* ... réservation */}
                        <CardContent className="p-6">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold">{formatPrice(data.price)}</div>
                                <div className="text-sm text-gray-500">par nuit</div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-2 mb-4">
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
                                                    if (checkOut && date && date >= checkOut) setCheckOut(undefined)
                                                    setOpenCheckIn(false)
                                                }}
                                                disabled={isPastDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

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
                                                disabled={(date) => !checkIn || isPastDate(date) || date < checkIn}
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
                                            <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} personne{i > 0 ? "s" : ""}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Récapitulatif */}
                            {checkIn && checkOut && (
                                <div className="border-t pt-4 mb-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{formatPrice(data.price)} × {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nuit(s)</span>
                                        <span>{formatPrice(calculateTotal())}</span>
                                    </div>
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
                                    const total = calculateTotal()

                                    const message = `Bonjour, je suis intéressé par la réservation :
        🏠 Résidence : ${data.title}
        📅 Arrivée : ${checkIn.toLocaleDateString("fr-FR")}
        📅 Départ : ${checkOut.toLocaleDateString("fr-FR")}
        👥 Nbre Personnes : ${guests}
        💵 Prix par nuit : ${formatPrice(data.price)}
        🌙 Nuits : ${nights}
        🧾 Total : ${formatPrice(total)}

        Pouvez-vous me confirmer la disponibilité ?`

                                    const phoneNumber = "2250564461216"
                                    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                                }}
                            >
                                <CalendarCheck className="w-5 h-5 mr-2" /> Réserver maintenant
                            </Button>
                            <p className="text-xs text-center text-gray-500 mt-2">Nous vous contacterons dans les brefs délai</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
