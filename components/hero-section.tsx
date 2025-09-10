"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-context"
import { Search, MapPin, CalendarIcon, Users } from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"

export function HeroSection() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [destination, setDestination] = useState("")
  const { t, language } = useLanguage()

  const locale = language === "fr" ? fr : enUS

  // return (
  //   <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
  //     {/* Background Image */}
  //     <div className="absolute inset-0 z-0">
  //       <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-orange-900/50 z-10" />
  //       <img
  //         src="/placeholder.svg?height=800&width=1200"
  //         alt="Résidence de luxe"
  //         className="w-full h-full object-cover"
  //       />
  //     </div>

  //     {/* Content */}
  //     <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
  //       <div className="max-w-4xl mx-auto">
  //         <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
  //           {t("hero.title")}
  //           <span className="text-orange-400 block">{t("hero.subtitle")}</span>
  //         </h1>
  //         <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>

  //         {/* Search Form */}
  //         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
  //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  //             {/* Destination */}
  //             {/* <div className="space-y-2">
  //               <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
  //                 {t("hero.destination")}
  //               </Label>
  //               <div className="relative">
  //                 <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
  //                 <Input
  //                   id="destination"
  //                   placeholder={t("hero.destinationPlaceholder")}
  //                   value={destination}
  //                   onChange={(e) => setDestination(e.target.value)}
  //                   className="pl-10"
  //                 />
  //               </div>
  //             </div> */}

  //             {/* Check-in */}
  //             {/* <div className="space-y-2">
  //               <Label className="text-sm font-medium text-gray-700">{t("hero.checkin")}</Label>
  //               <Popover>
  //                 <PopoverTrigger asChild>
  //                   <Button variant="outline" className="w-full justify-start text-left font-normal">
  //                     <CalendarIcon className="mr-2 h-4 w-4" />
  //                     {checkIn ? format(checkIn, "dd MMM yyyy", { locale }) : t("hero.selectDate")}
  //                   </Button>
  //                 </PopoverTrigger>
  //                 <PopoverContent className="w-auto p-0">
  //                   <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
  //                 </PopoverContent>
  //               </Popover>
  //             </div> */}

  //             {/* Check-out */}
  //             {/* <div className="space-y-2">
  //               <Label className="text-sm font-medium text-gray-700">{t("hero.checkout")}</Label>
  //               <Popover>
  //                 <PopoverTrigger asChild>
  //                   <Button variant="outline" className="w-full justify-start text-left font-normal">
  //                     <CalendarIcon className="mr-2 h-4 w-4" />
  //                     {checkOut ? format(checkOut, "dd MMM yyyy", { locale }) : t("hero.selectDate")}
  //                   </Button>
  //                 </PopoverTrigger>
  //                 <PopoverContent className="w-auto p-0">
  //                   <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
  //                 </PopoverContent>
  //               </Popover>
  //             </div> */}

  //             {/* Guests */}
  //             {/* <div className="space-y-2">
  //               <Label className="text-sm font-medium text-gray-700">{t("hero.guests")}</Label>
  //               <Select value={guests} onValueChange={setGuests}>
  //                 <SelectTrigger>
  //                   <Users className="mr-2 h-4 w-4" />
  //                   <SelectValue />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="1">1 {t("common.guests").slice(0, -1)}</SelectItem>
  //                   <SelectItem value="2">2 {t("common.guests")}</SelectItem>
  //                   <SelectItem value="3">3 {t("common.guests")}</SelectItem>
  //                   <SelectItem value="4">4 {t("common.guests")}</SelectItem>
  //                   <SelectItem value="5">5 {t("common.guests")}</SelectItem>
  //                   <SelectItem value="6">6+ {t("common.guests")}</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //           </div>

  //           <Button className="w-full md:w-auto mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
  //             <Search className="mr-2 h-5 w-5" />
  //             {t("hero.search")}
  //           </Button> */}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // )
  // Tableau d'images (jusqu’à 6)
  const images = [
    "/banners/1.png",
    "/banners/2.png",
    "/banners/3.png",
    "/banners/4.png",
  ]

  const [currentImage, setCurrentImage] = useState(0)

  // Défilement auto toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-orange-900/50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t("hero.title")}
            <span className="text-orange-400 block">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>

          {/* Exemple bouton */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-xl shadow-lg flex items-center justify-center mx-auto">
            <Search className="mr-2 h-5 w-5" />
            {t("hero.search")}
          </button>
        </div>
      </div>
    </section>
  )
}
