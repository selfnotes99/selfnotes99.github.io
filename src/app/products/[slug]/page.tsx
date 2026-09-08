import React from "react";
import { products } from "@/data/products";
import { fetchProductsFromGoogleSheet } from "@/lib/googleSheet";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = new Set<string>();

  // Include all fallback products
  products.forEach((p) => {
    if (p.slug) slugs.add(p.slug);
  });

  // Also include any live products from Google Sheets
  try {
    const sheetData = await fetchProductsFromGoogleSheet();
    if (sheetData?.products) {
      sheetData.products.forEach((p) => {
        if (p.slug) slugs.add(p.slug);
      });
    }
  } catch (e) {
    // Graceful fallback to static product list
  }

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export default function ProductDetailPage({ params }: PageProps) {
  return <ProductDetailClient params={params} />;
}
