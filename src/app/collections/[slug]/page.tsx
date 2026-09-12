import React from "react";
import type { Metadata } from "next";
import { collections } from "@/data/collections";
import { JsonLd } from "@/components/seo/JsonLd";
import CollectionDetailClient from "./CollectionDetailClient";

interface PageProps {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export function generateStaticParams() {
  return collections.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const collection = collections.find((c) => c.slug === params.slug);

  if (!collection) {
    return {
      title: "Collection Not Found",
      description: "The requested collection could not be found.",
    };
  }

  const title = `${collection.name} Study Notes & Bundles`;
  const description =
    collection.description ||
    `Explore curated CBSE study bundles, handwritten notes, and exam prep kits in the ${collection.name} collection.`;
  const canonicalUrl = `${SITE_URL}/collections/${collection.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: collection.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [collection.image || "/og-image.jpg"],
    },
  };
}

export default function CollectionDetailPage({ params }: PageProps) {
  const collection = collections.find((c) => c.slug === params.slug);

  const collectionSchema = collection
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: collection.name,
        description: collection.description,
        url: `${SITE_URL}/collections/${collection.slug}`,
      }
    : null;

  const breadcrumbSchema = collection
    ? {
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
            name: "Collections",
            item: `${SITE_URL}/collections`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: collection.name,
            item: `${SITE_URL}/collections/${collection.slug}`,
          },
        ],
      }
    : null;

  return (
    <>
      {collectionSchema && <JsonLd data={collectionSchema} />}
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
      <CollectionDetailClient params={params} />
    </>
  );
}
