import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Topper Canvas',
  description: 'Terms of service, digital license agreement, and acceptable use policy for Topper Canvas study materials.',
  alternates: {
    canonical: 'https://selfnotes99.github.io/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | Topper Canvas',
    description: 'Terms of service and digital license agreement for study notes on Topper Canvas.',
    url: 'https://selfnotes99.github.io/terms',
    siteName: 'SQL Mastery',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms & Conditions | Topper Canvas',
    description: 'Terms of service and license agreement for Topper Canvas study materials.',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#EBAF87] text-[#1F1714]">
      <header className="bg-[#EBAF87] py-4 border-b border-[#D49F7B]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-36">
              <Image
                src="/assets/topper_logo.png"
                alt="Topper Canvas Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#7C2928] text-white px-4 py-2 rounded-xl shadow hover:bg-[#521B18] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E2BEA2] space-y-6 text-[#3A2D26]">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1F1714]">
            Terms & Conditions
          </h1>
          <p className="text-sm text-neutral-500 font-semibold">
            Effective: 2026 Academic Season
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">1. Digital Product Delivery</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              All study materials, revision packs, and ebooks sold on Topper Canvas are strictly digital PDF goods. No physical book will be shipped to your address. Download links are generated immediately after verified payment and delivered via email and WhatsApp.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">2. Single-User Personal License</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Purchasing our notes grants the buyer a personal, non-transferable, single-user license for academic and educational purposes. You may print the notes for personal study. Redistribution, resale, or commercial broadcasting of the materials is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">3. Accuracy of Educational Content</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Our notes are designed by expert educators following the latest CBSE and computer science standards. While we take every measure to ensure accuracy, the material is intended as a supplementary study aid to complement core textbooks and school instruction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">4. Intellectual Property</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              All text, graphic mind-maps, diagrams, illustrations, and logos on this website are the proprietary intellectual property of Topper Canvas.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
