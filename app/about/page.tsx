import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Us | Topper Canvas - Smart Visual Notes',
  description: 'Learn more about Topper Canvas, our mission to simplify education with visual smart notes, and our practical study kits.',
  alternates: {
    canonical: 'https://selfnotes99.github.io/about',
  },
  openGraph: {
    title: 'About Us | Topper Canvas - Smart Visual Notes',
    description: 'Learn more about Topper Canvas and our mission to simplify learning with visual study notes.',
    url: 'https://selfnotes99.github.io/about',
    siteName: 'SQL Mastery',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Us | Topper Canvas',
    description: 'Learn more about Topper Canvas and our mission to simplify learning with visual study notes.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#EBAF87] text-[#1F1714]">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E2BEA2]">
          <h1 className="text-3xl sm:text-5xl font-black text-[#1F1714] mb-6">
            About Topper Canvas
          </h1>

          <div className="space-y-6 text-[#3A2D26] font-medium leading-relaxed text-base sm:text-lg">
            <p>
              Welcome to <strong>Topper Canvas</strong>, India&apos;s premier educational platform dedicated to transforming voluminous, stressful school and college curricula into concise, high-yield smart notes and visual learning kits.
            </p>

            <h2 className="text-2xl font-bold text-[#7C2928] pt-4">
              Our Mission
            </h2>
            <p>
              We believe that students should not spend hundreds of hours memorizing disjointed textbook definitions without conceptual clarity. Our mission is to make revision fast, stress-free, and accessible to every learner through structured 2-3 page chapter notes, graphical mind-maps, and exam-oriented problem-solving frameworks.
            </p>

            <h2 className="text-2xl font-bold text-[#7C2928] pt-4">
              Why Students & Parents Trust Us
            </h2>
            <ul className="space-y-3">
              {[
                'Over 56,000 students have used our study materials to prepare for academic exams and competitive tests.',
                'Curriculum strictly aligned to modern 2026 standards, CBSE marking schemes, and industry best practices.',
                'Immediate digital access on Mobile, Tablet, and Desktop with printable high-resolution PDF format.',
                'Lifetime access with complimentary updates and dedicated customer support via WhatsApp and email.'
              ].map((pt, i) => (
                <li key={i} className="flex items-start gap-3 font-semibold text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#7C2928] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-[#7C2928] pt-4">
              Contact & Support
            </h2>
            <p>
              Have questions about our notes or need assistance with your order? Our team is available 7 days a week:
            </p>
            <div className="bg-[#FAF0E9] p-4 rounded-xl border border-[#E2BEA2] text-sm sm:text-base font-semibold space-y-1">
              <p>Email: <a href="mailto:admin@toppercanvas.com" className="text-[#7C2928] underline">admin@toppercanvas.com</a></p>
              <p>WhatsApp Support: <a href="https://wa.me/919475465759" className="text-[#7C2928] underline">+91-9475465759</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
