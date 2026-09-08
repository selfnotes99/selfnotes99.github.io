import { Product, BuyerNotification } from "@/types";
import { products as defaultProducts } from "@/data/products";

export const GOOGLE_SHEET_ID = "1XIuVXM1U1Cv_4F3BCvBJHqGUdEDsL9mvvZQLk_qSLuM";
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit?usp=sharing`;
export const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

/**
 * Smart image link converter. Converts Google Drive sharing links, Dropbox links,
 * and cleans up query strings so images always load directly in browser.
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return "";
  let clean = url.trim();

  if (clean.startsWith("/images/")) {
    return clean;
  }

  // Google Drive format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const driveFileMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // Google Drive format: open?id=FILE_ID or uc?id=FILE_ID or thumbnail?id=FILE_ID
  const driveIdMatch = clean.match(/drive\.google\.com\/[^\s?#]*[?&]id=([a-zA-Z0-9_-]+)/i);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }

  // Dropbox dl=0 to raw=1
  if (clean.includes("dropbox.com") && clean.includes("dl=0")) {
    return clean.replace("dl=0", "raw=1");
  }

  // Unsplash resolution optimization
  if (clean.includes("images.unsplash.com")) {
    try {
      const u = new URL(clean);
      u.searchParams.set("w", "400");
      u.searchParams.set("q", "75");
      u.searchParams.set("auto", "format");
      return u.toString();
    } catch {
      return clean;
    }
  }

  return clean;
}

// Category-based fallback photo pools to ensure 4+ images even if user provided only 1 or 2
const CATEGORY_FALLBACK_IMAGES: Record<string, string[]> = {
  "bags-luggage": [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800&auto=format&fit=crop",
  ],
  "mens-fashion": [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
  ],
  "womens-fashion": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
  ],
  footwear: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
  ],
  "home-living": [
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?q=80&w=800&auto=format&fit=crop",
  ],
};

const GLOBAL_DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
];

export interface FetchSheetResult {
  products: Product[];
  recentBuyers?: BuyerNotification[];
  source: "google_sheet" | "default_fallback";
  rowCount: number;
  sheetId: string;
  sheetUrl: string;
  lastSynced: string;
  error?: string;
}

export async function fetchProductsFromGoogleSheet(bypassCache = false): Promise<FetchSheetResult> {
  try {
    const fetchUrl = bypassCache ? `${GVIZ_URL}&_ts=${Date.now()}` : GVIZ_URL;
    const fetchOptions: RequestInit = bypassCache
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } };

    const res = await fetch(fetchUrl, fetchOptions);

    if (!res.ok) {
      return {
        products: defaultProducts,
        source: "default_fallback",
        rowCount: defaultProducts.length,
        sheetId: GOOGLE_SHEET_ID,
        sheetUrl: GOOGLE_SHEET_URL,
        lastSynced: new Date().toISOString(),
        error: `HTTP ${res.status}: Failed to reach Google Sheets API`,
      };
    }

    const text = await res.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) {
      return {
        products: defaultProducts,
        source: "default_fallback",
        rowCount: defaultProducts.length,
        sheetId: GOOGLE_SHEET_ID,
        sheetUrl: GOOGLE_SHEET_URL,
        lastSynced: new Date().toISOString(),
        error: "Google Visualization response was empty or malformed",
      };
    }

    const data = JSON.parse(match[1]);
    const table = data.table;

    if (!table || !table.rows || table.rows.length === 0) {
      // The sheet currently has 0 data rows - serve complete 36-product fallback
      return {
        products: defaultProducts,
        source: "default_fallback",
        rowCount: defaultProducts.length,
        sheetId: GOOGLE_SHEET_ID,
        sheetUrl: GOOGLE_SHEET_URL,
        lastSynced: new Date().toISOString(),
      };
    }

    // Map column labels / IDs
    const colLabels = table.cols.map((col: { label?: string; id?: string }, index: number) => {
      return {
        index,
        label: (col.label || col.id || "").toLowerCase().trim(),
      };
    });

    const findCol = (keys: string[]) => {
      const found = colLabels.find((c: { label: string }) =>
        keys.some((k) => c.label.includes(k))
      );
      return found ? found.index : -1;
    };

    const titleIdx = findCol(["title", "name", "product"]);
    const priceIdx = findCol(["price", "cost", "mrp", "rate"]);
    const oldPriceIdx = findCol(["old", "original", "strikethrough", "was"]);
    const categoryIdx = findCol(["category", "cat", "type"]);
    const collectionIdx = findCol(["collection", "group"]);
    const descIdx = findCol(["desc", "description", "details", "info"]);
    const featuresIdx = findCol(["features", "feature", "specs", "bullet"]);
    const stockIdx = findCol(["stock", "qty", "quantity", "inventory"]);
    const ratingIdx = findCol(["rating", "stars"]);
    const reviewsIdx = findCol(["reviews", "review_count", "rating_count"]);
    const badgeIdx = findCol(["badge", "tag", "label"]);
    const sizesIdx = findCol(["size", "sizes"]);
    const colorsIdx = findCol(["color", "colors"]);
    const linkIdx = findCol(["link", "checkout", "buy_url", "url", "affiliate", "payment_link", "direct_link"]);
    const buyerNameIdx = findCol(["buyer name", "buyer", "customer name", "customer", "buyer_name", "client"]);
    const buyerLocIdx = findCol(["buyer location", "buyer city", "location", "city", "state", "country", "buyer_location"]);
    const buyerTimeIdx = findCol(["buyer time", "time ago", "purchased time", "time", "buyer_time"]);

    // Image columns: could be comma separated in "images" or separate "image 1", "image 2", etc.
    const imageIdx = findCol(["images", "image", "photo", "pic", "img"]);
    const img1Idx = findCol(["image 1", "photo 1", "image1", "img 1", "photo1"]);
    const img2Idx = findCol(["image 2", "photo 2", "image2", "img 2", "photo2"]);
    const img3Idx = findCol(["image 3", "photo 3", "image3", "img 3", "photo3"]);
    const img4Idx = findCol(["image 4", "photo 4", "image4", "img 4", "photo4"]);

    const parsedProducts: Product[] = [];
    const parsedBuyers: BuyerNotification[] = [];

    table.rows.forEach((row: { c: Array<{ v: any; f?: string } | null> }, rIdx: number) => {
      const getVal = (idx: number): string => {
        if (idx < 0 || !row.c || !row.c[idx]) return "";
        const cell = row.c[idx];
        return cell ? String(cell.v ?? cell.f ?? "").trim() : "";
      };

      const name = getVal(titleIdx) || `Product ${rIdx + 1}`;
      if (!name || name.toLowerCase() === "title" || name.toLowerCase() === "name" || name.toLowerCase() === "product name") {
        // Skip header row if it leaked into data
        return;
      }

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const price = parseFloat(getVal(priceIdx).replace(/[^0-9.]/g, "")) || 39.99;
      const oldPriceVal = parseFloat(getVal(oldPriceIdx).replace(/[^0-9.]/g, ""));
      const oldPrice = oldPriceVal > price ? oldPriceVal : undefined;
      const discount = oldPrice
        ? `${Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF`
        : undefined;

      const category = getVal(categoryIdx) || "Accessories";
      const categorySlug = category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const collection = getVal(collectionIdx) || "Trending Collection";
      const collectionSlug = collection
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const description =
        getVal(descIdx) ||
        "Crafted with meticulous attention to detail using premium sustainable materials designed for all-day comfort and timeless longevity.";

      const featuresRaw = getVal(featuresIdx);
      const features = featuresRaw
        ? featuresRaw.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean)
        : [
            "Handcrafted with sustainably certified materials",
            "Ergonomic design for daily lifestyle comfort",
            "Reinforced seams and premium finishing",
            "Easy maintenance & lifetime craftsmanship backing",
          ];

      // Collect images (at least 4 photos strictly enforced)
      const images: string[] = [];
      if (img1Idx >= 0 && getVal(img1Idx)) images.push(normalizeImageUrl(getVal(img1Idx)));
      if (img2Idx >= 0 && getVal(img2Idx)) images.push(normalizeImageUrl(getVal(img2Idx)));
      if (img3Idx >= 0 && getVal(img3Idx)) images.push(normalizeImageUrl(getVal(img3Idx)));
      if (img4Idx >= 0 && getVal(img4Idx)) images.push(normalizeImageUrl(getVal(img4Idx)));

      if (images.length < 4 && imageIdx >= 0) {
        const combined = getVal(imageIdx);
        if (combined) {
          const split = combined.split(/[,;\n\s]+/).map((s) => normalizeImageUrl(s.trim())).filter((s) => s.startsWith("http"));
          for (const s of split) {
            if (!images.includes(s)) images.push(s);
          }
        }
      }

      // Ensure minimum 4 photos per product!
      const catFallbacks = CATEGORY_FALLBACK_IMAGES[categorySlug] || GLOBAL_DEFAULT_IMAGES;
      let fallbackIndex = 0;
      while (images.length < 4) {
        const fallbackUrl = catFallbacks[fallbackIndex % catFallbacks.length];
        if (!images.includes(fallbackUrl)) {
          images.push(fallbackUrl);
        } else {
          images.push(GLOBAL_DEFAULT_IMAGES[fallbackIndex % GLOBAL_DEFAULT_IMAGES.length]);
        }
        fallbackIndex++;
      }

      const sizesRaw = getVal(sizesIdx);
      const sizes = sizesRaw
        ? sizesRaw.split(/[,;]+/).map((s) => s.trim()).filter(Boolean)
        : ["One Size"];

      const colorsRaw = getVal(colorsIdx);
      const colors = colorsRaw
        ? colorsRaw.split(/[,;]+/).map((c) => ({
            name: c.trim(),
            hex: "#064B35",
          }))
        : [
            { name: "Default Green", hex: "#064B35" },
            { name: "Classic Black", hex: "#111111" },
          ];

      const badgeRaw = getVal(badgeIdx);
      const badge = badgeRaw || (oldPrice ? "Sale" : undefined);
      const badgeType = badge === "Sale" ? "sale" : badge === "Best Seller" ? "best" : badge === "New" ? "new" : undefined;

      const stock = parseInt(getVal(stockIdx)) || 25;
      const rating = parseFloat(getVal(ratingIdx)) || 5.0;
      const reviewCount = parseInt(getVal(reviewsIdx)) || 88;

      const linkRaw = getVal(linkIdx);
      const link =
        linkRaw && linkRaw.startsWith("http")
          ? linkRaw.trim()
          : linkRaw && linkRaw.length > 3
          ? `https://${linkRaw.trim()}`
          : undefined;

      const buyerName = getVal(buyerNameIdx);
      const buyerLoc = getVal(buyerLocIdx);
      const buyerTime = getVal(buyerTimeIdx);
      const buyer: BuyerNotification | undefined = buyerName
        ? {
            name: buyerName,
            location: buyerLoc || "India",
            timeAgo: buyerTime || `${((rIdx * 3) % 25) + 2} minutes ago`,
            productName: name,
          }
        : undefined;

      if (buyer) {
        parsedBuyers.push(buyer);
      }

      parsedProducts.push({
        id: `sheet-prod-${rIdx + 1}`,
        slug,
        name,
        category,
        categorySlug,
        collection,
        collectionSlug,
        price,
        oldPrice,
        discount,
        rating,
        reviewCount,
        image: images[0],
        images, // Strictly minimum 4 photos!
        description,
        features,
        sizes,
        colors,
        badge,
        badgeType,
        stock,
        isNew: badge === "New",
        isBestSeller: badge === "Best Seller",
        isSale: Boolean(oldPrice || badge === "Sale"),
        featuredOrder: rIdx + 1,
        link,
        buyer,
      });
    });

    let finalBuyers = parsedBuyers;
    if (finalBuyers.length === 0) {
      // Check if a dedicated "Buyers" or "SocialProof" tab exists in the Google Sheet
      const tabBuyers = await fetchBuyersTabFromGoogleSheet();
      if (tabBuyers.length > 0) {
        finalBuyers = tabBuyers;
      }
    }

    if (parsedProducts.length === 0) {
      return {
        products: defaultProducts,
        source: "default_fallback",
        rowCount: defaultProducts.length,
        sheetId: GOOGLE_SHEET_ID,
        sheetUrl: GOOGLE_SHEET_URL,
        lastSynced: new Date().toISOString(),
      };
    }

    return {
      products: parsedProducts,
      recentBuyers: finalBuyers.length > 0 ? finalBuyers : undefined,
      source: "google_sheet",
      rowCount: parsedProducts.length,
      sheetId: GOOGLE_SHEET_ID,
      sheetUrl: GOOGLE_SHEET_URL,
      lastSynced: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching Google Sheet products:", error);
    return {
      products: defaultProducts,
      source: "default_fallback",
      rowCount: defaultProducts.length,
      sheetId: GOOGLE_SHEET_ID,
      sheetUrl: GOOGLE_SHEET_URL,
      lastSynced: new Date().toISOString(),
      error: String(error),
    };
  }
}

/**
 * Checks if the user has created a dedicated "Buyers" or "SocialProof" sheet tab
 * in their Google Spreadsheet and parses rows: Name, Location, Time, Product.
 */
async function fetchBuyersTabFromGoogleSheet(): Promise<BuyerNotification[]> {
  try {
    const res = await fetch(`${GVIZ_URL}&sheet=Buyers&_ts=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const text = await res.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) return [];
    const data = JSON.parse(match[1]);
    const table = data.table;
    if (!table || !table.rows || table.rows.length === 0) return [];

    let colLabels = table.cols.map((c: any) =>
      (c?.label || c?.id || "").toLowerCase().trim()
    );
    let startRow = 0;

    // Check if column headers were placed in the first data row (Row 0)
    if (!colLabels.some((l: string) => l.includes("name") || l.includes("buyer"))) {
      const row0Labels = (table.rows[0]?.c || []).map((cell: any) =>
        cell?.v ? String(cell.v).toLowerCase().trim() : ""
      );
      if (row0Labels.some((l: string) => l.includes("name") || l.includes("buyer"))) {
        colLabels = row0Labels;
        startRow = 1;
      }
    }

    // If it fell back to the main products sheet (contains price, oldprice, or features), skip
    if (colLabels.some((l: string) => l.includes("price") || l.includes("feature"))) {
      return [];
    }

    const nameIdx = colLabels.findIndex(
      (l: string) => l.includes("name") || l.includes("buyer") || l.includes("customer")
    );
    const locIdx = colLabels.findIndex(
      (l: string) => l.includes("loc") || l.includes("city") || l.includes("country")
    );
    const timeIdx = colLabels.findIndex(
      (l: string) => l.includes("time") || l.includes("ago")
    );
    const prodIdx = colLabels.findIndex(
      (l: string) => l.includes("product") || l.includes("title") || l.includes("item")
    );
    const activeIdx = colLabels.findIndex(
      (l: string) => l.includes("active") || l.includes("status") || l.includes("enable")
    );
    const imgIdx = colLabels.findIndex(
      (l: string) =>
        l.includes("image") ||
        l.includes("photo") ||
        l.includes("pic") ||
        l.includes("img")
    );

    if (nameIdx < 0) return [];

    const buyers: BuyerNotification[] = [];
    for (let i = startRow; i < table.rows.length; i++) {
      const row = table.rows[i];
      const getVal = (idx: number) =>
        idx >= 0 && row.c && row.c[idx]
          ? String(row.c[idx].v ?? row.c[idx].f ?? "").trim()
          : "";

      // If Active column exists, only skip if explicitly 0; if column is deleted by user, include all
      if (activeIdx >= 0) {
        const activeVal = getVal(activeIdx).toLowerCase();
        if (activeVal === "0" || activeVal === "false" || activeVal === "no" || activeVal === "inactive") {
          continue; // Skip row where Active is explicitly 0
        }
      }

      const name = getVal(nameIdx);
      const imgRaw = getVal(imgIdx);
      const image = imgRaw ? normalizeImageUrl(imgRaw) : undefined;

      if (
        name &&
        name.toLowerCase() !== "name" &&
        name.toLowerCase() !== "buyer name" &&
        name.toLowerCase() !== "customer"
      ) {
        buyers.push({
          name,
          location: getVal(locIdx) || "India",
          timeAgo: getVal(timeIdx) || "A few minutes ago",
          productName: getVal(prodIdx) || undefined,
          image,
        });
      }
    }

    return buyers;
  } catch (err) {
    return [];
  }
}

