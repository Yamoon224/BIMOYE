"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { CurrencyToggle } from "@/components/currency-toggle"
import { useLanguage } from "@/components/language-context"
import { Menu, X, User, MessageCircle, LayoutDashboard, UserCircle, LogIn } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.webp" alt="Mafamo Press Group" width={120} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors ${
                isActive("/categories")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t("nav.categories")}
            </Link>
            <Link
              href="/residences"
              className={`text-sm font-medium transition-colors ${
                isActive("/residences")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t("nav.allResidences")}
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t("nav.about")}
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <CurrencyToggle />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="h-4 w-4 mr-2" />
                  {t("nav.myAccount")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {t("nav.dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/messages">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("nav.messages")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-2" />
                    {t("nav.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    {t("nav.login")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/categories"
                className={`text-sm font-medium transition-colors ${
                  isActive("/categories") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t("nav.categories")}
              </Link>
              <Link
                href="/residences"
                className={`text-sm font-medium transition-colors ${
                  isActive("/residences") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t("nav.allResidences")}
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                href="/auth/login"
                className={`text-sm font-medium transition-colors ${
                  isActive("/auth/login") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t("nav.login")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
