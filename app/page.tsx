import { HeroSection } from "@/components/hero-section"
import { FeaturedResidences } from "@/components/featured-residences"
// import { PopularCategories } from "@/components/popular-categories"
import { OurServicesSection } from "@/components/our-services-section"
import { OurTeamSection } from "@/components/our-team-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedResidences />
      {/* <PopularCategories /> */}
      <OurServicesSection />
      <OurTeamSection />
      <CTASection />
    </main>
  )
}
