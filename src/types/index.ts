export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  collection: string;
  collectionSlug: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  sizes?: string[];
  colors?: ProductColor[];
  badge?: "Sale" | "Best Seller" | "New" | string;
  badgeType?: "sale" | "best" | "new";
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  featuredOrder?: number;
  link?: string; // Direct checkout/instant download/payment link from Google Sheet
  buyer?: BuyerNotification;
}

export interface BuyerNotification {
  name: string;
  location: string;
  timeAgo?: string;
  productName?: string;
  image?: string;
}

export interface CartItem {
  id: string; // unique key combining product.id + size + color
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  icon: string;
  count: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Orders" | "Shipping" | "Returns" | "Payment" | "Products";
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}
