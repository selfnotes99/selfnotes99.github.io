import React, { Suspense } from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import ShopClient from "./ShopClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "Shop All CBSE Notes & Study Material | Instant PDF Download",
  description:
    "Browse our complete catalog of CBSE Class 10 & 12 handwritten notes, NCERT revision bundles, color diagram guides, and study backpacks at best prices in India.",
  keywords: [
    "Shop CBSE notes",
    "class 10 study notes pdf",
    "class 12 board notes",
    "handwritten toppers notes",
    "ncert chapterwise pdf",
    "self notes 99 store",
  ],
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: "Shop All CBSE Notes & Study Guides | Self Notes 99",
    description:
      "Explore comprehensive chapter-wise CBSE handwritten study notes, diagrams, and exam preparation kits.",
    url: `${SITE_URL}/shop`,
  },
};

export default function ShopPage() {
  const shopPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All CBSE Notes & Study Guides",
    description:
      "Complete collection of high-scoring CBSE Class 10 & 12 handwritten notes, diagrams, and digital PDF downloads.",
    url: `${SITE_URL}/shop`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop All Products",
        item: `${SITE_URL}/shop`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[shopPageSchema, breadcrumbSchema]} />
      <Suspense
        fallback={
          <div className="max-w-[1400px] mx-auto p-8 text-center text-xs">
            Loading shop catalog...
          </div>
        }
      >
        <ShopClient />
      </Suspense>
    </>
  );
}
