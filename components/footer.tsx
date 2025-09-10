import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Image src="/logo.webp" alt="Mafamo Press Group" width={150} height={50} className="h-12 w-auto" />
            <p className="text-gray-300 text-sm">
              Votre partenaire de confiance pour des séjours exceptionnels dans les plus belles résidences.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              {/* <li>
                <Link href="/categories" className="text-gray-300 hover:text-white">
                  Catégories
                </Link>
              </li> */}
              <li>
                <Link href="/residences" className="text-gray-300 hover:text-white">
                  Toutes les résidences
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white">
                  Mon compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  CGU
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-orange-400" />
                <a 
                  href="mailto:contact@bimoye.com" 
                  className="text-gray-300 hover:underline"
                >
                  contact@bimoye.com
                </a>
              </div>

              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-orange-400" />
                <a 
                  href="tel:+2250564461216" 
                  className="text-gray-300 hover:underline"
                >
                  +225 05 64 46 12 16
                </a>
              </div>

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-orange-400" />
                <span className="text-gray-300">Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 BiMOYE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
