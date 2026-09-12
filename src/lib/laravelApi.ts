import { Product, BuyerNotification } from "@/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface LaravelProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface FetchProductsResult {
  products: Product[];
  recentBuyers: BuyerNotification[];
  source: "laravel_api" | "local_cache";
  rowCount: number;
  lastSynced: string;
}

/**
 * Fetch products from Laravel CMS REST API
 */
export async function fetchProductsFromLaravel(
  bypassCache = false
): Promise<FetchProductsResult> {
  const url = `${API_BASE_URL}/products${bypassCache ? `?_t=${Date.now()}` : ""}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // Short cache revalidation for Next.js SSR / SSG
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Laravel API returned status ${res.status}`);
    }

    const json: LaravelProductsResponse = await res.json();
    const products: Product[] = Array.isArray(json?.data) ? json.data : [];

    // Also attempt to fetch recent buyer notifications for social proof
    let buyers: BuyerNotification[] = [];
    try {
      const buyerRes = await fetch(`${API_BASE_URL}/buyers/recent`, {
        headers: { Accept: "application/json" },
      });
      if (buyerRes.ok) {
        const buyerJson = await buyerRes.json();
        buyers = Array.isArray(buyerJson?.data) ? buyerJson.data : [];
      }
    } catch {
      // Non-blocking for buyers
    }

    const result: FetchProductsResult = {
      products,
      recentBuyers: buyers,
      source: "laravel_api",
      rowCount: products.length,
      lastSynced: new Date().toISOString(),
    };

    // Cache locally for instant loading on reloads
    if (typeof window !== "undefined" && products.length > 0) {
      try {
        localStorage.setItem("selfnotes_laravel_cache", JSON.stringify(result));
      } catch {}
    }

    return result;
  } catch (error) {
    console.warn("Could not reach Laravel API at " + API_BASE_URL, error);

    // Fallback to local storage cache if available
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("selfnotes_laravel_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.products?.length > 0) {
            return {
              ...parsed,
              source: "local_cache",
            };
          }
        }
      } catch {}
    }

    throw error;
  }
}

/**
 * Fetch categories from Laravel API
 */
export async function fetchCategoriesFromLaravel() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.warn("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Fetch collections from Laravel API
 */
export async function fetchCollectionsFromLaravel() {
  try {
    const res = await fetch(`${API_BASE_URL}/collections`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.warn("Failed to fetch collections:", error);
    return [];
  }
}

/**
 * Submit customer order to Laravel API
 */
export async function submitOrderToLaravel(orderData: {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address?: string;
  payment_method?: string;
  notes?: string;
  items: Array<{
    product_id: string | number;
    product_name: string;
    quantity: number;
    unit_price: number;
    options?: any;
  }>;
  subtotal: number;
  discount?: number;
  shipping_fee?: number;
  grand_total: number;
}) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || `Order creation failed (${res.status})`);
  }

  return await res.json();
}

/**
 * Submit review to Laravel API
 */
export async function submitReviewToLaravel(reviewData: {
  product_id?: string | number;
  author_name: string;
  author_role?: string;
  rating: number;
  comment: string;
}) {
  const res = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || `Review submission failed`);
  }

  return await res.json();
}
