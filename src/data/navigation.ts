export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: "shop" | "collections";
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", hasDropdown: true, dropdownType: "shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const shopDropdownLinks = [
  { label: "All Products", href: "/shop", count: "36 items", highlight: false },
  { label: "Women's Fashion", href: "/shop?category=womens-fashion", count: "48 items", highlight: false },
  { label: "Men's Fashion", href: "/shop?category=mens-fashion", count: "36 items", highlight: false },
  { label: "Footwear", href: "/shop?category=footwear", count: "24 items", highlight: false },
  { label: "Bags & Luggage", href: "/shop?category=bags-luggage", count: "32 items", highlight: false },
  { label: "Accessories", href: "/shop?category=accessories", count: "40 items", highlight: false },
  { label: "Home & Living", href: "/shop?category=home-living", count: "28 items", highlight: false },
  { label: "Sale & Offers", href: "/sale", count: "Up to 50% off", highlight: true },
];

export const collectionsDropdownLinks = [
  {
    label: "Summer Collection",
    href: "/collections/summer",
    desc: "Lightweight linens & breezy essentials",
  },
  {
    label: "Winter Collection",
    href: "/collections/winter",
    desc: "Cozy merinos & heavyweight fleece",
  },
  {
    label: "Premium Collection",
    href: "/collections/premium",
    desc: "Artisanal leather & precision timepieces",
  },
  {
    label: "Trending Collection",
    href: "/collections/trending",
    desc: "Our community's most-loved essentials",
  },
  {
    label: "New Collection",
    href: "/collections/new",
    desc: "Fresh 2025 arrivals just landed",
  },
];
