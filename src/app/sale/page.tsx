import React from "react";
import type { Metadata } from "next";
import SaleClient from "./SaleClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "CBSE Notes on Sale — Discounted Bundles & Special Offers",
  description:
    "Save big on combined CBSE Class 10 & 12 notes bundles, chapter packages, and topper exam preparation kits on Self Notes 99.",
  alternates: {
    canonical: `${SITE_URL}/sale`,
  },
  openGraph: {
    title: "CBSE Study Notes on Sale | Self Notes 99",
    description:
      "Discounted student packs and board exam revision materials with instant download access.",
    url: `${SITE_URL}/sale`,
  },
};

export default function SalePage() {
  return <SaleClient />;
}
