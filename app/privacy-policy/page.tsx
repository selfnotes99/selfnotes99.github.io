import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Topper Canvas',
  description: 'Our privacy policy explains how Topper Canvas collects, protects, and uses student and customer information.',
  alternates: {
    canonical: 'https://selfnotes99.github.io/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Topper Canvas',
    description: 'Learn how your data is protected with 256-bit SSL encryption on Topper Canvas.',
    url: 'https://selfnotes99.github.io/privacy-policy',
    siteName: 'SQL Mastery',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Topper Canvas',
    description: 'Learn how your data is protected on Topper Canvas.',
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 font-semibold">
            Last Updated: 2026 Edition
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">1. Information We Collect</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              When you purchase a study kit or digital notes from Topper Canvas, we collect information necessary to fulfill your order, including your name, email address, WhatsApp/mobile number, and payment confirmation details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">2. How We Use Your Information</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Your details are used exclusively to deliver digital download links, send curriculum and edition updates, and provide direct customer support via email and WhatsApp. We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">3. Payment Security</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              All transactions are securely processed through RBI-authorized payment gateways utilizing 256-bit SSL encryption. Topper Canvas does not store your credit card, debit card, or UPI PIN numbers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">4. Contact Us</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              For any questions regarding your data privacy, write to us at <a href="mailto:admin@toppercanvas.com" className="text-[#7C2928] underline">admin@toppercanvas.com</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
