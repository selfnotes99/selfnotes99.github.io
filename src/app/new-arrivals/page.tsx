import React from "react";
import type { Metadata } from "next";
import NewArrivalsClient from "./NewArrivalsClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "New Arrivals — Latest CBSE Exam Notes & Study Releases",
  description:
    "Discover the newly published CBSE Class 10 & 12 revision notes, updated syllabus chapters, model question answers, and digital study kits on Self Notes 99.",
  alternates: {
    canonical: `${SITE_URL}/new-arrivals`,
  },
  openGraph: {
    title: "New Arrivals | Self Notes 99 CBSE Store",
    description:
      "Freshly added handwritten notes, chapter summaries, and exam guides for the current academic session.",
    url: `${SITE_URL}/new-arrivals`,
  },
};

export default function NewArrivalsPage() {
  return <NewArrivalsClient />;
}
