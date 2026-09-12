import React from "react";
import type { Metadata } from "next";
import DealsClient from "./DealsClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "Flash Deals & Discounts on CBSE Notes — Up to 50% OFF",
  description:
    "Limited-time discounts on CBSE Class 10 & 12 handwritten study notes, NCERT revision bundles, and diagram guides. Get instant download access at reduced student prices.",
  alternates: {
    canonical: `${SITE_URL}/deals`,
  },
  openGraph: {
    title: "Exam Study Deals | Self Notes 99",
    description: "Grab discounted CBSE handwritten notes and exam revision materials.",
    url: `${SITE_URL}/deals`,
  },
};

export default function DealsPage() {
  return <DealsClient />;
}
