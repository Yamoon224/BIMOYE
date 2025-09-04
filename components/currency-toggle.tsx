"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Coins } from "lucide-react"

export function CurrencyToggle() {
  const [currentCurrency, setCurrentCurrency] = useState("EUR")

  const currencies = [
    { code: "EUR", symbol: "€" },
    { code: "USD", symbol: "$" },
    { code: "XOF", symbol: "CFA" },
  ]

  const currentCurrencyData = currencies.find((currency) => currency.code === currentCurrency)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Coins className="h-4 w-4 mr-2" />
          <span>{currentCurrencyData?.symbol}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setCurrentCurrency(currency.code)}
            className="cursor-pointer"
          >
            <span className="mr-2">{currency.symbol}</span>
            {currency.code}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
