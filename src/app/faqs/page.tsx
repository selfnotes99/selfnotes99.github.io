import React from "react";
import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import FaqsClient from "./FaqsClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) — Ordering, Downloads & Returns",
  description:
    "Get instant answers to all questions regarding CBSE notes downloads, payment options (UPI/Cards), delivery times, syllabus coverage, and return policy.",
  alternates: {
    canonical: `${SITE_URL}/faqs`,
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQs) | Self Notes 99",
    description:
      "Frequently asked questions about CBSE study notes, digital downloads, payments, and 24/7 student support.",
    url: `${SITE_URL}/faqs`,
  },
};

export default function FAQsPage() {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqPageSchema} />
      <FaqsClient />
    </>
  );
}
