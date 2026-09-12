import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Refund Policy | Topper Canvas',
  description: 'Learn about the instant digital delivery, cancellation, and refund policies for study notes on Topper Canvas.',
  alternates: {
    canonical: 'https://selfnotes99.github.io/refund-policy',
  },
  openGraph: {
    title: 'Shipping & Refund Policy | Topper Canvas',
    description: 'Instant digital delivery and refund policies for digital study notes on Topper Canvas.',
    url: 'https://selfnotes99.github.io/refund-policy',
    siteName: 'SQL Mastery',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Shipping & Refund Policy | Topper Canvas',
    description: 'Instant digital delivery and refund policies on Topper Canvas.',
  },
};

export default function RefundPolicyPage() {
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
            Shipping, Cancellation & Refund Policy
          </h1>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">1. Shipping Policy (Instant Digital Delivery)</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              All products offered on Topper Canvas are digital downloadable study notes in PDF format. There is no physical shipping or postal dispatch. Delivery occurs instantly via:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base font-semibold">
              <li>On-screen download redirect immediately following completed payment.</li>
              <li>An automated delivery email containing your direct download links (within 5–10 minutes).</li>
              <li>Optional WhatsApp delivery link sent to the phone number entered at checkout.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">2. Cancellation & Refund Policy</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Because our study notes are irrevocable, downloadable digital intellectual property that cannot be physically returned once sent, standard purchases are non-refundable.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              However, we are committed to 100% customer satisfaction. We will promptly issue a full refund or immediate replacement if:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base font-semibold">
              <li>You were charged multiple times for the same order due to a payment gateway duplicate transaction.</li>
              <li>The digital file is corrupted or technically inaccessible and our support team cannot provide a working copy within 24 hours.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#7C2928]">3. Need Help with Your Order?</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              If you experienced any difficulty accessing your files, please contact us immediately on WhatsApp at <strong>+91-9475465759</strong> or email <strong>admin@toppercanvas.com</strong>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
