import React from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import ContactClient from "./ContactClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export const metadata: Metadata = {
  title: "Contact Us — Student Helpline & Customer Care",
  description:
    "Need help with your CBSE notes order or download link? Contact Self Notes 99 via email (help@selfnotes99.com) or WhatsApp (+91-8595403030). Fast support within 2 hours.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Self Notes 99 | Student Support & Inquiries",
    description:
      "Get in touch with Self Notes 99. We are available to help you with order downloads, syllabus inquiries, and student assistance.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Self Notes 99",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Self Notes 99",
      telephone: "+91-8595403030",
      email: "help@selfnotes99.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8595403030",
        contactType: "customer support",
        availableLanguage: ["Hindi", "English"],
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <ContactClient />
    </>
  );
}
