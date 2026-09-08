import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const pPath = path.join(rootDir, "src", "data", "products.ts");
let content = fs.readFileSync(pPath, "utf-8");

const productsDir = path.join(rootDir, "public", "images", "products");
const files = fs.readdirSync(productsDir);

let replaced = 0;
for (const file of files) {
  if (file.endsWith("-main.jpg")) {
    const slug = file.replace("-main.jpg", "");
    const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?image:\\s*)"([^"]+)"`);
    const match = content.match(regex);
    if (match && match[2] && !match[2].startsWith("/images/")) {
      content = content.replace(regex, `$1"/images/products/${file}"`);
      replaced++;
    }
  }
}

fs.writeFileSync(pPath, content, "utf-8");
console.log(`✅ Updated products.ts with ${replaced} local image paths.`);
