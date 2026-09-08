import React from "react";
import { collections } from "@/data/collections";
import CollectionDetailClient from "./CollectionDetailClient";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return collections.map((c) => ({
    slug: c.slug,
  }));
}

export default function CollectionDetailPage({ params }: PageProps) {
  return <CollectionDetailClient params={params} />;
}
