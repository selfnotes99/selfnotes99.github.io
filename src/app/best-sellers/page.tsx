import React from "react";
import type { Metadata } from "next";
import BestSellersClient from "./BestSellersClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "Best-Selling CBSE Notes & Toppers Study Material",
  description:
    "Explore our most popular CBSE Class 10 & 12 handwritten notes, NCERT revision bundles, and diagram cheat sheets with verified 5-star student reviews.",
  alternates: {
    canonical: `${SITE_URL}/best-sellers`,
  },
  openGraph: {
    title: "Best-Selling CBSE Notes | Self Notes 99",
    description:
      "The most trusted CBSE exam notes and study materials downloaded by thousands of students.",
    url: `${SITE_URL}/best-sellers`,
  },
};

export default function BestSellersPage() {
  return <BestSellersClient />;
}
