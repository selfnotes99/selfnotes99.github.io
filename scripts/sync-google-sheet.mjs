import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const GOOGLE_SHEET_ID = "1XIuVXM1U1Cv_4F3BCvBJHqGUdEDsL9mvvZQLk_qSLuM";
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

function normalizeImageUrl(url) {
  if (!url) return "";
  let clean = String(url).trim();

  if (clean.startsWith("/images/")) {
    return clean;
  }

  const driveFileMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  const driveIdMatch = clean.match(/drive\.google\.com\/(?:open|uc)\?id=([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }

  if (clean.includes("dropbox.com") && clean.includes("dl=0")) {
    return clean.replace("dl=0", "raw=1");
  }

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

const CATEGORY_FALLBACK_IMAGES = {
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

async function sync() {
  console.log("🔄 Fetching latest data from Google Sheet...");
  try {
    const fetchUrl = `${GVIZ_URL}&_ts=${Date.now()}`;
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const text = await res.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) {
      throw new Error("Could not parse GVIZ response");
    }

    const data = JSON.parse(match[1]);
    const table = data.table;

    if (!table || !table.rows) {
      throw new Error("No data table found in sheet");
    }

    const colLabels = table.cols.map((col, index) => ({
      index,
      label: (col.label || col.id || "").toLowerCase().trim(),
    }));

    const findCol = (keys) => {
      const found = colLabels.find((c) => keys.some((k) => c.label.includes(k)));
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
    const buyerLocIdx = findCol(["buyer location", "buyer city", "location", "city", "state", "country"]);
    const buyerTimeIdx = findCol(["buyer time", "time ago", "purchased time", "time", "buyer_time"]);

    const imageIdx = findCol(["images", "image", "photo", "pic", "img"]);
    const img1Idx = findCol(["image 1", "photo 1", "image1", "img 1", "photo1"]);
    const img2Idx = findCol(["image 2", "photo 2", "image2", "img 2", "photo2"]);
    const img3Idx = findCol(["image 3", "photo 3", "image3", "img 3", "photo3"]);
    const img4Idx = findCol(["image 4", "photo 4", "image4", "img 4", "photo4"]);

    const parsedProducts = [];
    const parsedBuyers = [];

    table.rows.forEach((row, rIdx) => {
      const getVal = (idx) => {
        if (idx < 0 || !row.c || !row.c[idx]) return "";
        const cell = row.c[idx];
        return cell ? String(cell.v ?? cell.f ?? "").trim() : "";
      };

      const name = getVal(titleIdx) || `Product ${rIdx + 1}`;
      if (!name || name.toLowerCase() === "title" || name.toLowerCase() === "name" || name.toLowerCase() === "product name") {
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
        ? featuresRaw.split(/[|,;\n]+/).map((s) => s.trim()).filter(Boolean)
        : [
            "Handcrafted with sustainably certified materials",
            "Ergonomic design for daily lifestyle comfort",
            "Reinforced seams and premium finishing",
            "Easy maintenance & lifetime craftsmanship backing",
          ];

      const images = [];
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
      const buyer = buyerName
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
        images,
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

    // Also fetch dedicated Buyers tab if any
    try {
      const buyerRes = await fetch(`${GVIZ_URL}&sheet=Buyers&_ts=${Date.now()}`);
      if (buyerRes.ok) {
        const bText = await buyerRes.text();
        const bMatch = bText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
        if (bMatch && bMatch[1]) {
          const bData = JSON.parse(bMatch[1]);
          const bTable = bData.table;
          if (bTable && bTable.rows && bTable.rows.length > 0) {
            let bCols = bTable.cols.map((c) => (c?.label || c?.id || "").toLowerCase().trim());
            let bStart = 0;
            if (!bCols.some((l) => l.includes("name") || l.includes("buyer"))) {
              const r0 = (bTable.rows[0]?.c || []).map((cell) => (cell?.v ? String(cell.v).toLowerCase().trim() : ""));
              if (r0.some((l) => l.includes("name") || l.includes("buyer"))) {
                bCols = r0;
                bStart = 1;
              }
            }

            const nameIdx = bCols.findIndex((l) => l.includes("name") || l.includes("buyer") || l.includes("customer"));
            const locIdx = bCols.findIndex((l) => l.includes("loc") || l.includes("city") || l.includes("country"));
            const timeIdx = bCols.findIndex((l) => l.includes("time") || l.includes("ago"));
            const prodIdx = bCols.findIndex((l) => l.includes("product") || l.includes("title") || l.includes("item"));
            const activeIdx = bCols.findIndex((l) => l.includes("active") || l.includes("status") || l.includes("enable"));
            const imgIdx = bCols.findIndex((l) => l.includes("image") || l.includes("photo") || l.includes("pic") || l.includes("img"));

            if (nameIdx >= 0) {
              for (let i = bStart; i < bTable.rows.length; i++) {
                const row = bTable.rows[i];
                const getVal = (idx) => (idx >= 0 && row.c && row.c[idx] ? String(row.c[idx].v ?? row.c[idx].f ?? "").trim() : "");
                if (activeIdx >= 0) {
                  const activeVal = getVal(activeIdx).toLowerCase();
                  if (activeVal === "0" || activeVal === "false" || activeVal === "no" || activeVal === "inactive") continue;
                }
                const name = getVal(nameIdx);
                const imgRaw = getVal(imgIdx);
                const image = imgRaw ? normalizeImageUrl(imgRaw) : undefined;
                if (name && name.toLowerCase() !== "name" && name.toLowerCase() !== "buyer name") {
                  parsedBuyers.push({
                    name,
                    location: getVal(locIdx) || "India",
                    timeAgo: getVal(timeIdx) || "A few minutes ago",
                    productName: getVal(prodIdx) || undefined,
                    image,
                  });
                }
              }
            }
          }
        }
      }
    } catch (e) {
      // ignore buyers tab fail
    }

    const outputData = {
      products: parsedProducts,
      recentBuyers: parsedBuyers,
      rowCount: parsedProducts.length,
      lastSynced: new Date().toISOString(),
      source: "google_sheet_json",
    };

    const targetDir = path.join(__dirname, "..", "src", "data");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, "googleSheetData.json");
    fs.writeFileSync(targetFile, JSON.stringify(outputData, null, 2), "utf-8");

    console.log(`✅ Success! Synced ${parsedProducts.length} products and ${parsedBuyers.length} buyers.`);
    console.log(`📁 Saved to: ${targetFile}`);
  } catch (err) {
    console.warn("⚠️ Could not reach Google Sheet:", err.message);
    const targetFile = path.join(__dirname, "..", "src", "data", "googleSheetData.json");
    if (fs.existsSync(targetFile)) {
      console.log("✅ Existing local googleSheetData.json cache preserved.");
      process.exit(0);
    }
    console.error("❌ No existing cache found.");
    process.exit(1);
  }
}

sync();
