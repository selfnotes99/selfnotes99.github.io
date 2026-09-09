import { HeroSection } from "@/components/hero/HeroSection";
import { CategorySection } from "@/components/categories/CategorySection";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { BenefitsStrip } from "@/components/home/BenefitsStrip";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { VerifiedCustomerReviews } from "@/components/products/VerifiedCustomerReviews";

export default function HomePage() {
  return (
    <div className="space-y-2">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Shop by Category */}
      <CategorySection />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Verified Customer Reviews / Testimonials */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <VerifiedCustomerReviews
          title="Testimonials 🤩"
          subtitle="Exceptional feedback from our readers 🚀"
        />
      </div>

      {/* 5. Premium Benefits Strip */}
      <BenefitsStrip />

      {/* 6. Join Our Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
}
