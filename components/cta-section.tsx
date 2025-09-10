"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-context"
import { ArrowRight, Search } from "lucide-react"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("cta.title")}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Search className="mr-2 h-5 w-5" />
              {t("cta.explore")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-blue-600 hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              {t("cta.learnMore")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
