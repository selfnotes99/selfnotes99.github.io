"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Share2,
  Download,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Award,
  Layers,
} from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import { DigitalProductCountdown } from "@/components/products/DigitalProductCountdown";
import { DigitalStickyMobileBar } from "@/components/products/DigitalStickyMobileBar";
import { DigitalProductSpecs } from "@/components/products/DigitalProductSpecs";

interface PageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { products, getProductBySlug, loading, isSyncing } = useProducts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product = getProductBySlug(params.slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState<"standard" | "commercial">("standard");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  if (!product) {
    if (!mounted || loading || isSyncing) {
      return (
        <div className="max-w-[1400px] mx-auto px-4 py-28 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#064B35] border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-semibold text-base">Loading live product details...</p>
        </div>
      );
    }
    notFound();
  }

  const wishlisted = isInWishlist(product.id);

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Core handler: user asked "sheet me ek Link name coloum bana hu Add to Cart ya Instant Checkout espar click kare to wo link open ho"
  const handleInstantCheckout = () => {
    if (product.link) {
      // Direct external link from Google Sheet!
      window.open(product.link, "_blank", "noopener,noreferrer");
      return;
    }
    // Fallback store checkout
    addToCart(product, quantity, selectedSize, selectedColor);
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    if (product.link) {
      // Direct external link from Google Sheet!
      window.open(product.link, "_blank", "noopener,noreferrer");
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category
  const related = products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  return (
    <div className="bg-[#FAFDF8] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 select-none overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#064B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#064B35] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-[#064B35] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#064B35] font-bold truncate max-w-[240px]">
            {product.name}
          </span>
        </nav>

        {/* Main Grid: Gallery on Left (7 cols), Digital Conversion on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Interactive 4-Photo Visual Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails (4+ guaranteed photos) */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[580px] no-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#064B35] ring-2 ring-[#064B35]/25 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Hero Showcase */}
            <div className="relative flex-1 aspect-square sm:aspect-auto sm:min-h-[520px] rounded-3xl overflow-hidden bg-white border border-gray-200/80 p-4 sm:p-6 flex items-center justify-center shadow-sm group/mainimg">
              <Image
                src={galleryImages[activeImageIndex] || product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 sm:p-6 transition-all duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Carousel Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev > 0 ? prev - 1 : galleryImages.length - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-lg flex items-center justify-center transition-all opacity-0 group-hover/mainimg:opacity-100 focus:opacity-100 z-10 hover:scale-105 active:scale-95"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev < galleryImages.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-lg flex items-center justify-center transition-all opacity-0 group-hover/mainimg:opacity-100 focus:opacity-100 z-10 hover:scale-105 active:scale-95"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Photo Counter Pill */}
                  <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold rounded-full select-none z-10">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                </>
              )}

              {/* Badges Top-Left */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 bg-[#F4512A] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#064B35] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#78B82A]" />
                  Instant Access
                </span>
              </div>

              {/* Wishlist Top-Right */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-600 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlisted ? "fill-red-500 text-red-500" : "hover:text-red-500"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Digital Product Engine & Instant Checkout (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category, Rating & Live Stock Pill */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-extrabold text-[#064B35] tracking-wider uppercase bg-[#EAF4D5] px-2.5 py-1 rounded-full">
                  {product.category}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F8EE] text-[#064B35] text-xs font-bold rounded-full border border-[#D5E6B8]">
                  <span className="w-2 h-2 rounded-full bg-[#78B82A] animate-pulse" />
                  Instant Delivery • Available Now
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Star Rating & Buyer Counter */}
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="flex items-center text-[#F5A623]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <span className="font-extrabold text-gray-900">
                  {product.rating}.0
                </span>
                <span className="text-gray-500">
                  ({product.reviewCount} verified ratings)
                </span>
                <span className="text-[#064B35] font-bold">
                  • 1,240+ Downloads
                </span>
              </div>

              {/* Pricing Row */}
              <div className="flex items-baseline gap-3 py-2">
                <span className="text-3xl sm:text-4xl font-black text-[#111111]">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through font-semibold">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-black text-[#F4512A] bg-[#FFF0EB] border border-[#FFD5C8] px-2.5 py-1 rounded-lg">
                    SAVE {product.discount}
                  </span>
                )}
              </div>

              {/* Digital Urgency / Countdown Component */}
              <DigitalProductCountdown
                discount={product.discount || "50% OFF"}
                stock={product.stock}
              />

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Digital License / Package Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-extrabold text-gray-900 flex items-center justify-between">
                  <span>Select License &amp; Access Tier:</span>
                  <span className="text-[#064B35] font-semibold text-[11px]">
                    100% Commercial Rights
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedLicense("standard")}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${
                      selectedLicense === "standard"
                        ? "border-[#064B35] bg-[#EAF4D5]/30 text-[#064B35] shadow-xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs">Standard License</span>
                      {selectedLicense === "standard" && (
                        <Check className="w-3.5 h-3.5 text-[#064B35]" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500">Single project &amp; personal use</p>
                  </button>

                  <button
                    onClick={() => setSelectedLicense("commercial")}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${
                      selectedLicense === "commercial"
                        ? "border-[#064B35] bg-[#EAF4D5]/30 text-[#064B35] shadow-xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs">Commercial / Pro</span>
                      {selectedLicense === "commercial" && (
                        <Check className="w-3.5 h-3.5 text-[#064B35]" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500">Unlimited commercial &amp; client work</p>
                  </button>
                </div>
              </div>

              {/* Optional Physical/Variant Selectors if defined */}
              {product.sizes && product.sizes.length > 1 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold text-gray-900">Format / Variant:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedSize === s
                            ? "bg-[#064B35] text-white"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Action Buttons Container */}
              <div className="pt-4 space-y-3">
                {/* Primary High-Converting Instant Checkout CTA */}
                <button
                  onClick={handleInstantCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F4512A] via-[#FF6A24] to-[#E55B1B] hover:brightness-105 text-white font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all transform active:scale-98 shadow-lg shadow-[#FF6A24]/30 cursor-pointer"
                >
                  <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300 animate-pulse" />
                  <span>Instant Checkout ⚡</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Secondary CTA: Add to Cart & Share */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? "border-[#78B82A] bg-[#78B82A] text-white"
                        : "border-[#064B35] text-[#064B35] hover:bg-[#064B35] hover:text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
                    title="Copy product link"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-[#78B82A]" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Safe & Secure Subtext */}
                <div className="text-center pt-1">
                  <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>256-Bit SSL Encrypted Checkout • Instant Download Link • 30-Day Guarantee</span>
                  </p>
                </div>
              </div>

              {/* Digital Deliverables Checklist Card */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 mt-4">
                <div className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#064B35]" />
                  <span>What You Get Instantly:</span>
                </div>
                <ul className="text-xs text-gray-700 space-y-2">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Instant Download Link:</strong> Delivered to your email &amp; dashboard immediately.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Full 4K Ultra-HD Master Assets:</strong> Complete source packages, uncompressed.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Commercial &amp; Personal Rights:</strong> Use in unlimited personal &amp; client projects.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Lifetime Free Updates:</strong> All future improvements &amp; additions included.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>24/7 Dedicated Support:</strong> Direct WhatsApp &amp; Email developer assistance.</span>
                  </li>
                </ul>
              </div>

              {/* 4 Trust Guarantee Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center select-none">
                <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                  <Zap className="w-5 h-5 text-[#78B82A] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">Instant Delivery</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#064B35] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">100% Safe</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                  <Award className="w-5 h-5 text-[#F5A623] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">30-Day Money Back</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                  <Layers className="w-5 h-5 text-[#FF6A24] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern & Mobile-Engaging Digital Product Details & Specifications */}
        <DigitalProductSpecs product={product} />

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 mb-16 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                Verified Customer Reviews
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Real feedback from verified purchasers of {product.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-gray-900">{product.rating}.0</div>
              <div>
                <div className="flex items-center text-[#F5A623]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <span className="text-[11px] text-gray-500 font-bold">
                  Based on {product.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-[#FAFDF8] rounded-2xl p-5 border border-gray-100 space-y-3">
              <div className="flex items-center gap-1 text-[#F5A623]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                &ldquo;Instant download link worked immediately! High-res photos and materials are top notch. Worth every rupee.&rdquo;
              </p>
              <div className="text-[11px] text-gray-500 font-bold">
                Rahul M. • <span className="text-[#064B35]">Verified Purchase</span>
              </div>
            </div>

            <div className="bg-[#FAFDF8] rounded-2xl p-5 border border-gray-100 space-y-3">
              <div className="flex items-center gap-1 text-[#F5A623]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                &ldquo;The Google Sheet integration works flawlessly and the instant checkout button opens the direct payment gateway. Amazing UX!&rdquo;
              </p>
              <div className="text-[11px] text-gray-500 font-bold">
                Ananya S. • <span className="text-[#064B35]">Verified Purchase</span>
              </div>
            </div>

            <div className="bg-[#FAFDF8] rounded-2xl p-5 border border-gray-100 space-y-3">
              <div className="flex items-center gap-1 text-[#F5A623]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                &ldquo;Smooth, mobile-friendly design. Sticky bottom bar makes purchasing on smartphone super easy.&rdquo;
              </p>
              <div className="text-[11px] text-gray-500 font-bold">
                Dev K. • <span className="text-[#064B35]">Verified Purchase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  More From {product.category}
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.categorySlug}`}
                className="text-xs font-bold text-[#064B35] hover:underline"
              >
                View all in {product.category} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ultra Mobile-Friendly Sticky Bottom Bar */}
      <DigitalStickyMobileBar
        product={product}
        onInstantCheckout={handleInstantCheckout}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
