"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, BuyerNotification } from "@/types";
import { products as fallbackProducts } from "@/data/products";
import {
  API_BASE_URL,
  fetchProductsFromLaravel,
  FetchProductsResult,
} from "@/lib/laravelApi";

interface ProductContextType {
  products: Product[];
  recentBuyers: BuyerNotification[];
  featuredProducts: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  loading: boolean;
  isSyncing: boolean;
  source: "laravel_api" | "local_cache" | "default_fallback";
  rowCount: number;
  apiUrl: string;
  adminUrl: string;
  sheetId?: string;
  sheetUrl?: string;
  lastSynced: string;
  error?: string;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts?: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(
    initialProducts || fallbackProducts
  );
  const [recentBuyers, setRecentBuyers] = useState<BuyerNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [source, setSource] = useState<
    "laravel_api" | "local_cache" | "default_fallback"
  >("laravel_api");
  const [rowCount, setRowCount] = useState(products.length);
  const [lastSynced, setLastSynced] = useState<string>(new Date().toISOString());
  const [error, setError] = useState<string | undefined>(undefined);

  const adminUrl = API_BASE_URL.replace(/\/api\/?$/, "/admin");

  const fetchProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsSyncing(true);
    }
    setProducts((prev) => {
      if (!prev || prev.length === 0) {
        setLoading(true);
      }
      return prev;
    });
    setError(undefined);

    try {
      const data: FetchProductsResult = await fetchProductsFromLaravel(isRefresh);
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
        setSource(data.source);
        setRowCount(data.rowCount);
        setLastSynced(data.lastSynced);
      }
      if (data.recentBuyers && Array.isArray(data.recentBuyers) && data.recentBuyers.length > 0) {
        setRecentBuyers(data.recentBuyers);
      }
    } catch (err: any) {
      console.warn("Could not sync with Laravel REST API, using cached catalog:", err);
      setError(err?.message || "API connection failed");
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  // Instant local cache restore on client mount (avoids delay on refresh)
  useEffect(() => {
    try {
      const cached = localStorage.getItem("selfnotes_laravel_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
          setProducts(parsed.products);
          if (parsed.recentBuyers) setRecentBuyers(parsed.recentBuyers);
          if (parsed.lastSynced) setLastSynced(parsed.lastSynced);
          setSource("local_cache");
        }
      }
    } catch {}

    fetchProducts(false);
  }, [fetchProducts]);

  const refreshProducts = async () => {
    await fetchProducts(true);
  };

  const getProductBySlug = (slug: string) => {
    if (!slug) return undefined;
    const clean = slug.toLowerCase().trim();
    return (
      products.find((p) => p.slug === clean) ||
      products.find((p) => p.id === clean) ||
      products.find((p) => p.slug.replace(/-\d+$/, "") === clean.replace(/-\d+$/, "")) ||
      products.find(
        (p) =>
          p.slug.toLowerCase().replace(/[^a-z0-9]/g, "") ===
          clean.replace(/[^a-z0-9]/g, "")
      )
    );
  };

  const featuredProducts = products.slice(0, 8);

  return (
    <ProductContext.Provider
      value={{
        products,
        recentBuyers,
        featuredProducts,
        getProductBySlug,
        loading,
        isSyncing,
        source,
        rowCount,
        apiUrl: API_BASE_URL,
        adminUrl,
        lastSynced,
        error,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
