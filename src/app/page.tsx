import { HeroSection } from "@/components/hero/HeroSection";
import { CategorySection } from "@/components/categories/CategorySection";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { BenefitsStrip } from "@/components/home/BenefitsStrip";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";

export default function HomePage() {
  return (
    <div className="space-y-2">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Shop by Category */}
      <CategorySection />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Premium Benefits Strip */}
      <BenefitsStrip />

      {/* 5. Join Our Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
}
