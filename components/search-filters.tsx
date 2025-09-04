"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Users, Filter } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface SearchFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()

  const amenities = [
    { id: "wifi", label: "WiFi" },
    { id: "parking", label: "Parking" },
    { id: "pool", label: "Piscine" },
    { id: "spa", label: "Spa" },
    { id: "gym", label: "Salle de sport" },
    { id: "kitchen", label: "Cuisine équipée" },
    { id: "ac", label: "Climatisation" },
    { id: "balcony", label: "Balcon/Terrasse" },
  ]

  const categories = [
    { value: "", label: "Toutes les catégories" },
    { value: "luxury", label: "Luxe" },
    { value: "beach", label: "Bord de mer" },
    { value: "mountain", label: "Montagne" },
    { value: "urban", label: "Urbain" },
    { value: "nature", label: "Nature" },
    { value: "tropical", label: "Tropical" },
  ]

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="location">Destination</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="Où souhaitez-vous aller ?"
              className="pl-10"
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Arrivée</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "dd MMM yyyy", { locale: fr }) : "Sélectionner"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Départ</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "dd MMM yyyy", { locale: fr }) : "Sélectionner"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Voyageurs */}
        <div className="space-y-2">
          <Label>Voyageurs</Label>
          <Select
            value={filters.guests.toString()}
            onValueChange={(value) => onFiltersChange({ ...filters, guests: Number.parseInt(value) })}
          >
            <SelectTrigger>
              <Users className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 voyageur</SelectItem>
              <SelectItem value="2">2 voyageurs</SelectItem>
              <SelectItem value="3">3 voyageurs</SelectItem>
              <SelectItem value="4">4 voyageurs</SelectItem>
              <SelectItem value="5">5 voyageurs</SelectItem>
              <SelectItem value="6">6+ voyageurs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prix */}
        <div className="space-y-4">
          <Label>Prix par nuit</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
            max={1000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{filters.priceRange[0]}€</span>
            <span>{filters.priceRange[1]}€</span>
          </div>
        </div>

        {/* Catégorie */}
        <div className="space-y-2">
          <Label>Catégorie</Label>
          <Select value={filters.category} onValueChange={(value) => onFiltersChange({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Équipements */}
        <div className="space-y-4">
          <Label>Équipements</Label>
          <div className="grid grid-cols-1 gap-3">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFiltersChange({
                        ...filters,
                        amenities: [...filters.amenities, amenity.id],
                      })
                    } else {
                      onFiltersChange({
                        ...filters,
                        amenities: filters.amenities.filter((a: string) => a !== amenity.id),
                      })
                    }
                  }}
                />
                <Label htmlFor={amenity.id} className="text-sm font-normal">
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={() => console.log("Applying filters:", filters)}>
          Appliquer les filtres
        </Button>
      </CardContent>
    </Card>
  )
}
