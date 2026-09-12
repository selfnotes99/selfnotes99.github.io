import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { DigitalSocialProofToast } from "@/components/products/DigitalSocialProofToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Self Notes 99 — CBSE Handwritten Notes, Study Guides & Topper PDFs",
    template: "%s | Self Notes 99",
  },
  description:
    "Download high-scoring CBSE Class 10 & 12 handwritten notes, NCERT line-by-line solutions, chapter summaries, diagram cheat sheets, and premium study kits with instant delivery.",
  keywords: [
    "CBSE Class 10 Handwritten Notes",
    "Class 12 Biology Notes PDF",
    "Topper Notes Download",
    "CBSE Board Exam 2026",
    "NCERT Line by Line Notes",
    "Class 10 Science Handwritten Notes",
    "Best Study Notes for CBSE",
    "Self Notes 99",
    "Digital Exam PDF Notes",
    "Instant Study Material Download",
  ],
  authors: [{ name: "Self Notes 99", url: SITE_URL }],
  creator: "Self Notes 99",
  publisher: "Self Notes 99",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Self Notes 99",
    title: "Self Notes 99 — CBSE Handwritten Notes & Study Guides",
    description:
      "Master your CBSE board exams with topper handwritten notes, colorful diagrams, and chapter-wise study materials with instant digital access.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Self Notes 99 — CBSE Handwritten Notes & Study Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self Notes 99 — CBSE Handwritten Notes & Study Guides",
    description:
      "Master your CBSE board exams with topper handwritten notes, colorful diagrams, and chapter-wise study materials with instant digital access.",
    images: ["/og-image.jpg"],
    creator: "@selfnotes99",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Self Notes 99",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Provider of premium CBSE Class 10 & 12 handwritten study notes, NCERT revision materials, and exam guides.",
  email: "support@selfnotes99.com",
  sameAs: [
    "https://facebook.com/selfnotes99",
    "https://instagram.com/selfnotes99",
    "https://pinterest.com/selfnotes99",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Self Notes 99",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

import { ProductProvider } from "@/context/ProductContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-[#111111] bg-white flex flex-col min-h-screen selection:bg-[#EAF4D5] selection:text-[#064B35]">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              {/* Top Announcement Bar */}
              <AnnouncementBar />

              {/* Main Sticky Header */}
              <Header />

              {/* Main Content Area */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Floating Toast Notification */}
              <ToastNotification />

              {/* Global Recent Buyer Social Proof Notification (20% Larger, All Pages) */}
              <DigitalSocialProofToast />
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
