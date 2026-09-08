import React from "react";
import { products } from "@/data/products";
import cachedSheetData from "@/data/googleSheetData.json";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: { slug: string };
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

export default function ProductDetailPage({ params }: PageProps) {
  return <ProductDetailClient params={params} />;
}
