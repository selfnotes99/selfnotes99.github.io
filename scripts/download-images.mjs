import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

async function downloadFile(url, destPath) {
  try {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return true;
    }

    // Optimize Unsplash URL resolution to ~350px & q=75 before downloading
    let downloadUrl = url;
    if (downloadUrl.includes("images.unsplash.com")) {
      const u = new URL(downloadUrl);
      u.searchParams.set("w", "400");
      u.searchParams.set("q", "75");
      u.searchParams.set("auto", "format");
      downloadUrl = u.toString();
    }

    const res = await fetch(downloadUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch ${url} (status: ${res.status})`);
      return false;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.warn(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function run() {
  console.log("🚀 Starting local image download and compression...");

  // 1. Categories
  console.log("\n📦 Downloading Category Images...");
  const categoriesPath = path.join(rootDir, "src", "data", "categories.ts");
  let categoriesContent = fs.readFileSync(categoriesPath, "utf-8");
  
  const categories = [
    { slug: "womens-fashion", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
    { slug: "mens-fashion", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
    { slug: "footwear", url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
    { slug: "bags-luggage", url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" },
    { slug: "accessories", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" },
    { slug: "home-living", url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop" },
    { slug: "deals-offers", url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=800&auto=format&fit=crop" },
  ];

  for (const cat of categories) {
    const dest = path.join(publicDir, "images", "categories", `${cat.slug}.jpg`);
    const ok = await downloadFile(cat.url, dest);
    if (ok) {
      console.log(`  ✓ Saved: /images/categories/${cat.slug}.jpg (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
      categoriesContent = categoriesContent.replace(cat.url, `/images/categories/${cat.slug}.jpg`);
    }
  }
  fs.writeFileSync(categoriesPath, categoriesContent, "utf-8");

  // 2. Hero Section Images
  console.log("\n🎨 Downloading Hero Section Images...");
  const heroImages = [
    { name: "plant", url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=400&auto=format&fit=crop" },
    { name: "handbag", url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop" },
    { name: "sneakers", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" },
    { name: "sweater", url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop" },
    { name: "sunglasses", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop" },
  ];

  const heroPath = path.join(rootDir, "src", "components", "hero", "HeroSection.tsx");
  let heroContent = fs.readFileSync(heroPath, "utf-8");

  for (const h of heroImages) {
    const dest = path.join(publicDir, "images", "hero", `${h.name}.jpg`);
    const ok = await downloadFile(h.url, dest);
    if (ok) {
      console.log(`  ✓ Saved: /images/hero/${h.name}.jpg (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
      heroContent = heroContent.replace(h.url, `/images/hero/${h.name}.jpg`);
    }
  }
  fs.writeFileSync(heroPath, heroContent, "utf-8");

  // 3. Hero Trust Badge Avatars
  console.log("\n⭐ Downloading Hero Trust Badge Avatars...");
  const avatarPath = path.join(rootDir, "src", "components", "hero", "HeroTrustBadge.tsx");
  let avatarContent = fs.readFileSync(avatarPath, "utf-8");
  const avatars = [
    { name: "avatar-1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
    { name: "avatar-2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
    { name: "avatar-3", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  ];
  for (const av of avatars) {
    const dest = path.join(publicDir, "images", "avatars", `${av.name}.jpg`);
    const ok = await downloadFile(av.url, dest);
    if (ok) {
      console.log(`  ✓ Saved: /images/avatars/${av.name}.jpg (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
      avatarContent = avatarContent.replace(av.url, `/images/avatars/${av.name}.jpg`);
    }
  }
  fs.writeFileSync(avatarPath, avatarContent, "utf-8");

  // 4. Products Images in googleSheetData.json
  console.log("\n🛍️ Downloading Product Images...");
  const jsonPath = path.join(rootDir, "src", "data", "googleSheetData.json");
  let data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  let productCount = 0;
  for (let i = 0; i < data.products.length; i++) {
    const prod = data.products[i];
    const safeSlug = prod.slug || `prod-${i + 1}`;

    // Download main image
    if (prod.image && prod.image.startsWith("http")) {
      const dest = path.join(publicDir, "images", "products", `${safeSlug}-main.jpg`);
      const ok = await downloadFile(prod.image, dest);
      if (ok) {
        prod.image = `/images/products/${safeSlug}-main.jpg`;
        productCount++;
      }
    }

    // Download gallery images
    if (Array.isArray(prod.images)) {
      for (let j = 0; j < prod.images.length; j++) {
        const imgUrl = prod.images[j];
        if (imgUrl && imgUrl.startsWith("http")) {
          const dest = path.join(publicDir, "images", "products", `${safeSlug}-${j + 1}.jpg`);
          const ok = await downloadFile(imgUrl, dest);
          if (ok) {
            prod.images[j] = `/images/products/${safeSlug}-${j + 1}.jpg`;
          }
        }
      }
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  ✓ Processed ${data.products.length} products (saved ${productCount} main images)`);

  console.log("\n✨ All images downloaded locally & compressed successfully!");
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
