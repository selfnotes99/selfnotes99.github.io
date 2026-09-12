import React from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import cachedSheetData from "@/data/googleSheetData.json";
import { JsonLd } from "@/components/seo/JsonLd";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "@/types";

interface PageProps {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

function getProduct(slug: string): Product | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();

  // Search fallback products
  let found = products.find(
    (p) =>
      p.slug.toLowerCase() === clean ||
      p.id.toLowerCase() === clean ||
      p.slug.replace(/-\d+$/, "") === clean.replace(/-\d+$/, "")
  );

  // Search cached products
  if (!found && cachedSheetData?.products && Array.isArray(cachedSheetData.products)) {
    found = (cachedSheetData.products as Product[]).find(
      (p) =>
        p.slug?.toLowerCase() === clean ||
        p.id?.toLowerCase() === clean
    );
  }

  return found;
}

export function generateStaticParams() {
  const slugs = new Set<string>();

  // Include all fallback products
  products.forEach((p) => {
    if (p.slug) slugs.add(p.slug);
  });

  // Include all synced Google Sheet products
  if (cachedSheetData?.products && Array.isArray(cachedSheetData.products)) {
    cachedSheetData.products.forEach((p: any) => {
      if (p.slug) slugs.add(p.slug);
    });
  }

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested study notes or product could not be found.",
    };
  }

  const title = `${product.name} — Class 10 & 12 Notes PDF`;
  const description =
    product.description?.slice(0, 160) ||
    `Download ${product.name} instantly. Comprehensive CBSE board notes with chapter-wise solved questions, diagrams, and revision formulas.`;
  const canonicalUrl = `${SITE_URL}/products/${product.slug}`;
  const imageUrl = product.image || "/og-image.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      product.name,
      `${product.category} notes`,
      `${product.category} cbse class 10`,
      "handwritten study notes pdf",
      "self notes 99",
      ...(product.features || []),
    ],
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProduct(params.slug);

  const productSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images : [product.image],
        description: product.description,
        sku: `SN-${product.id}`,
        mpn: `MPN-${product.slug}`,
        brand: {
          "@type": "Brand",
          name: "Self Notes 99",
        },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/products/${product.slug}`,
          priceCurrency: "INR",
          price: product.price,
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability:
            product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Self Notes 99",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating || 5,
          reviewCount: product.reviewCount || 48,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : null;

  const breadcrumbSchema = product
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
            name: "Shop All Notes",
            item: `${SITE_URL}/shop`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.category || "CBSE Notes",
            item: `${SITE_URL}/shop?category=${product.categorySlug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: product.name,
            item: `${SITE_URL}/products/${product.slug}`,
          },
        ],
      }
    : null;

  return (
    <>
      {productSchema && <JsonLd data={productSchema} />}
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
      <ProductDetailClient params={params} />
    </>
  );
}
