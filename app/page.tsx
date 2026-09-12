'use client';

import React, { useState } from 'react';
import { PRODUCT_CONFIG } from '@/config/product';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductOffer } from '@/components/ProductOffer';
import { HowToPurchase } from '@/components/HowToPurchase';
import { UrgencyValueSection } from '@/components/UrgencyValueSection';
import { WhyKidNeeds } from '@/components/WhyKidNeeds';
import { SubjectsSection } from '@/components/SubjectsSection';
import { TrustSection } from '@/components/TrustSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { SQLPreviewModal } from '@/components/SQLPreviewModal';
import { SampleShowcaseSection } from '@/components/SampleShowcaseSection';

export default function Home() {
  const [sqlModalOpen, setSqlModalOpen] = useState(false);
  const [previewInitialIndex, setPreviewInitialIndex] = useState(0);

  // Dedicated 100% to SQL Ebook
  const sqlEdition = PRODUCT_CONFIG.editions.sql;

  return (
    <main className="min-h-screen bg-[#EBAF87] selection:bg-[#7C2928] selection:text-white">
      {/* 1. Announcement Ticker Top Bar */}
      <AnnouncementBar text={sqlEdition.tickerText} />

      {/* 2. Responsive Sticky Header */}
      <Header
        currentEdition="sql"
        onToggleEdition={() => setSqlModalOpen(true)}
        ctaText={`Get SQL Ebook ₹${sqlEdition.currentPrice}`}
      />

      {/* 3. Hero Section (Headline, Subtitles, CTA, SQL 3D Book Presentation) */}
      <HeroSection
        edition={sqlEdition}
        onOpenSqlPreview={() => setSqlModalOpen(true)}
      />

      {/* 4. Product Offer Section (3D SQL Box on wood table, rating, price, features) */}
      <ProductOffer
        edition={sqlEdition}
        onBuy={() => {
          const el = document.getElementById('purchase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. How To Purchase (4 Step Cards) */}
      <HowToPurchase />

      {/* 6. Urgency & Value Section (Popcorn vs Laptop study kit) */}
      <UrgencyValueSection edition={sqlEdition} />

      {/* 7. Why You Need This SQL Ebook (6 Feature Cards) */}
      <WhyKidNeeds edition={sqlEdition} />

      {/* 8. Core Units & Modules Covered (6 Checkerboard Cards) */}
      <SubjectsSection edition={sqlEdition} />

      {/* 9. Look Inside: Real Handwritten Visual Notes (All 7 Original Sheets Showcase) */}
      <SampleShowcaseSection
        onOpenModal={(idx) => {
          setPreviewInitialIndex(idx);
          setSqlModalOpen(true);
        }}
      />

      {/* 10. Trust Section (Doodle Banner + 3 Outcome Cards) */}
      <TrustSection edition={sqlEdition} />

      {/* 11. Comparison Section (Generic Video Courses vs Our Practical Ebook) */}
      <ComparisonSection edition={sqlEdition} />

      {/* 12. Before vs After Section (Framed Photos + Social Proof Metric) */}
      <BeforeAfterSection edition={sqlEdition} />

      {/* 13. Student & Learner Testimonials Carousel */}
      <Testimonials edition={sqlEdition} />

      {/* 15. Frequently Asked Questions (Accordion + Pointing Student Photo) */}
      <FAQSection edition={sqlEdition} />

      {/* 16. High-Conversion Final CTA */}
      <FinalCTA edition={sqlEdition} />

      {/* 17. Comprehensive Footer */}
      <Footer />

      {/* 18. Mobile Sticky Bottom Purchase Bar */}
      <MobileStickyBar edition={sqlEdition} />

      {/* 19. Sample SQL Pages Interactive Viewer Modal */}
      <SQLPreviewModal
        isOpen={sqlModalOpen}
        onClose={() => setSqlModalOpen(false)}
        initialIndex={previewInitialIndex}
      />
    </main>
  );
}
