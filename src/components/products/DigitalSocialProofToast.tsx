"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, X, Zap } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { BuyerNotification } from "@/types";

const FALLBACK_BUYERS: BuyerNotification[] = [
  { name: "Aarav S.", location: "Mumbai, India", timeAgo: "2 minutes ago" },
  { name: "Priya M.", location: "Delhi, India", timeAgo: "4 minutes ago" },
  { name: "Vikram K.", location: "Bangalore, India", timeAgo: "7 minutes ago" },
  { name: "Ananya R.", location: "Pune, India", timeAgo: "11 minutes ago" },
  { name: "Sameer T.", location: "Hyderabad, India", timeAgo: "15 minutes ago" },
  { name: "Rohan V.", location: "Chennai, India", timeAgo: "19 minutes ago" },
  { name: "Jessica L.", location: "London, UK", timeAgo: "24 minutes ago" },
  { name: "David M.", location: "California, USA", timeAgo: "29 minutes ago" },
  { name: "Kavita S.", location: "Jaipur, India", timeAgo: "35 minutes ago" },
];

const RANDOM_MINUTES = [2, 3, 4, 6, 8, 11, 14, 18, 23, 27];

export interface DigitalSocialProofToastProps {
  productName?: string;
  productImage?: string;
  productSlug?: string;
}

export const DigitalSocialProofToast: React.FC<DigitalSocialProofToastProps> = ({
  productName: propName,
  productImage: propImage,
  productSlug: propSlug,
}) => {
  const pathname = usePathname();
  const { products, recentBuyers } = useProducts();
  const [buyerIndex, setBuyerIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Active buyers list: prioritize Google Sheet live buyers if available
  const availableBuyers =
    recentBuyers && recentBuyers.length > 0 ? recentBuyers : FALLBACK_BUYERS;

  // Detect if user is currently on a Product Detail Page (e.g. /products/premium-sneakers-2)
  const isProductPage = pathname?.startsWith("/products/");
  const routeSlug = isProductPage
    ? pathname.replace("/products/", "").split("/")[0]?.split("?")[0]?.toLowerCase().trim()
    : null;

  // If on a product page, find THAT current product from catalog
  const currentRouteProduct = routeSlug
    ? products.find(
        (p) =>
          p.slug.toLowerCase().trim() === routeSlug ||
          p.id.toLowerCase().trim() === routeSlug ||
          p.slug.replace(/-\d+$/, "") === routeSlug.replace(/-\d+$/, "")
      )
    : null;

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Loop through notifications every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        // Randomize buyer & product on each cycle
        setBuyerIndex((prev) => {
          if (availableBuyers.length <= 1) return 0;
          const next = Math.floor(Math.random() * availableBuyers.length);
          return next === prev ? (next + 1) % availableBuyers.length : next;
        });
        setProductIndex((prev) => {
          if (!products || products.length <= 1) return 0;
          const next = Math.floor(Math.random() * products.length);
          return next === prev ? (next + 1) % products.length : next;
        });
        setCycleCount((c) => c + 1);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed, availableBuyers.length, products.length]);

  if (isDismissed || !isVisible) return null;

  const currentBuyer = availableBuyers[buyerIndex % availableBuyers.length];
  const activeCatalogProduct =
    products && products.length > 0 ? products[productIndex % products.length] : null;

  // Core intelligence: If on a product page, ALWAYS lock to THAT product's name and image!
  // Otherwise, cycle catalog products or match buyer's product.
  let currentProductName: string;
  let currentProductImage: string;
  let currentProductSlug: string | undefined;

  if (currentRouteProduct) {
    currentProductName = currentRouteProduct.name;
    currentProductImage = currentRouteProduct.image;
    currentProductSlug = currentRouteProduct.slug;
  } else if (propName) {
    currentProductName = propName;
    currentProductImage =
      propImage || activeCatalogProduct?.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
    currentProductSlug = propSlug || activeCatalogProduct?.slug;
  } else if (currentBuyer?.productName) {
    const cleanProdName = currentBuyer.productName.toLowerCase().trim();
    const matched = products.find(
      (p) =>
        p.name.toLowerCase().trim() === cleanProdName ||
        p.name.toLowerCase().includes(cleanProdName) ||
        cleanProdName.includes(p.name.toLowerCase())
    );
    if (matched) {
      currentProductName = matched.name;
      currentProductImage = matched.image;
      currentProductSlug = matched.slug;
    } else {
      currentProductName = currentBuyer.productName;
      currentProductImage =
        currentBuyer.image ||
        activeCatalogProduct?.image ||
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
      currentProductSlug = activeCatalogProduct?.slug;
    }
  } else {
    currentProductName = activeCatalogProduct?.name || "Premium Sneakers 2";
    currentProductImage =
      activeCatalogProduct?.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
    currentProductSlug = activeCatalogProduct?.slug;
  }

  // If buyer explicitly has a custom image in the Google Sheet Buyers tab and user is not on a specific PDP
  if (currentBuyer?.image && !currentRouteProduct) {
    currentProductImage = currentBuyer.image;
  }

  const timeDisplay = currentRouteProduct
    ? `${RANDOM_MINUTES[(buyerIndex + cycleCount) % RANDOM_MINUTES.length]} minutes ago`
    : currentBuyer.timeAgo || `${RANDOM_MINUTES[(buyerIndex + cycleCount) % RANDOM_MINUTES.length]} minutes ago`;

  const content = (
    <>
      {/* Product Image (+20% size: 58px / 62px) */}
      <div className="relative w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/90 shadow-sm">
        <Image
          src={currentProductImage}
          alt={currentProductName}
          fill
          className="object-cover"
          sizes="64px"
        />
        <span
          className="absolute bottom-0 right-0 w-[18px] h-[18px] bg-[#78B82A] rounded-full border-2 border-white flex items-center justify-center shadow-sm"
          title="Verified Buyer"
        >
          <CheckCircle2 className="w-2.5 h-2.5 text-white stroke-[2.5]" />
        </span>
      </div>

      {/* Details (+20% font sizes) */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-[13px] sm:text-[14px] font-extrabold text-gray-900 truncate">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4512A] fill-[#F4512A] shrink-0" />
          <span>{currentBuyer.name}</span>
          <span className="text-gray-400 font-normal text-[12px] sm:text-[13px]">
            from {currentBuyer.location}
          </span>
        </div>
        <p className="text-[12.5px] sm:text-[13.5px] text-gray-600 truncate mt-0.5">
          Purchased <strong className="text-[#064B35] font-bold">{currentProductName}</strong>
        </p>
        <span className="text-[10.5px] sm:text-[11.5px] text-gray-400 font-medium block mt-0.5">
          Verified Purchase • {timeDisplay}
        </span>
      </div>
    </>
  );

  return (
    <aside
      aria-label="Recent buyer notification"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-auto max-w-[380px] sm:max-w-[435px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-gray-200/90 p-3.5 sm:p-4 animate-fadeIn flex items-center gap-3.5 transition-all select-none group hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      {currentProductSlug ? (
        <Link
          href={`/products/${currentProductSlug}`}
          className="flex-1 flex items-center gap-3.5 min-w-0 cursor-pointer"
        >
          {content}
        </Link>
      ) : (
        <div className="flex-1 flex items-center gap-3.5 min-w-0">{content}</div>
      )}

      {/* Dismiss Button (+20% size) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDismissed(true);
        }}
        className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </button>
    </aside>
  );
};
