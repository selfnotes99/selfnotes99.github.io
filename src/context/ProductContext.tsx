"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, BuyerNotification } from "@/types";
import { products as fallbackProducts } from "@/data/products";
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_URL, FetchSheetResult, fetchProductsFromGoogleSheet } from "@/lib/googleSheet";
import cachedSheetData from "@/data/googleSheetData.json";

interface ProductContextType {
  products: Product[];
  recentBuyers: BuyerNotification[];
  featuredProducts: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  loading: boolean;
  isSyncing: boolean;
  source: "google_sheet" | "default_fallback";
  rowCount: number;
  sheetId: string;
  sheetUrl: string;
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
  const initialDataProducts =
    cachedSheetData?.products && cachedSheetData.products.length > 0
      ? (cachedSheetData.products as unknown as Product[])
      : fallbackProducts;

  const initialDataBuyers =
    cachedSheetData?.recentBuyers && cachedSheetData.recentBuyers.length > 0
      ? (cachedSheetData.recentBuyers as unknown as BuyerNotification[])
      : [];

  const [products, setProducts] = useState<Product[]>(initialProducts || initialDataProducts);
  const [recentBuyers, setRecentBuyers] = useState<BuyerNotification[]>(initialDataBuyers);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [source, setSource] = useState<"google_sheet" | "default_fallback">("google_sheet");
  const [rowCount, setRowCount] = useState(products.length);
  const [lastSynced, setLastSynced] = useState<string>(cachedSheetData?.lastSynced || new Date().toISOString());
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsSyncing(true);
    } else {
      setLoading(true);
    }
    setError(undefined);

    try {
      const data: FetchSheetResult = await fetchProductsFromGoogleSheet(isRefresh);
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
      console.warn("Could not sync with Google Sheet API, using local product catalog:", err);
      setError(err?.message || "Sync failed");
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
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

  const featuredProducts = products.slice(0, 6);

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
        sheetId: GOOGLE_SHEET_ID,
        sheetUrl: GOOGLE_SHEET_URL,
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
