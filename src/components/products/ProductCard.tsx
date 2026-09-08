"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.link) {
      window.open(product.link, "_blank", "noopener,noreferrer");
      return;
    }

    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Badge styling matching reference
  const renderBadge = () => {
    if (!product.badge) return null;

    let badgeClasses = "bg-[#78B82A] text-white"; // default New
    if (product.badgeType === "sale" || product.badge === "Sale") {
      badgeClasses = "bg-[#F4512A] text-white";
    } else if (product.badgeType === "best" || product.badge === "Best Seller") {
      badgeClasses = "bg-[#0B6B47] text-white";
    }

    return (
      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${badgeClasses}`}>
        {product.badge}
      </span>
    );
  };

  return (
    <div className="group bg-white rounded-xl border border-[#EEEEEE] hover:border-[#E0E0E0] p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 select-none">
      <div>
        {/* Card Header: Badge & Heart */}
        <div className="flex items-center justify-between min-h-[22px] mb-1">
          <div>{renderBadge()}</div>
          <button
            onClick={handleWishlistToggle}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-auto"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                wishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Product Image with Secondary Image on Hover */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block w-full aspect-square rounded-lg overflow-hidden bg-[#FAFAFA] mb-3 group/img"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className={`object-contain p-2 transition-all duration-500 ease-out ${
              product.images && product.images[1]
                ? "group-hover/img:opacity-0"
                : "group-hover:scale-106"
            }`}
          />
          {product.images && product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate angle`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-contain p-2 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-106 transition-all duration-500 ease-out"
            />
          )}
        </Link>

        {/* Product Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[13px] font-semibold text-[#111111] group-hover:text-[#064B35] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Price & Old Price */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-sm font-extrabold text-[#111111]">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through font-normal">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-[#F5A623]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            ({product.reviewCount})
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
          isAdded
            ? "bg-[#78B82A] text-white shadow-sm"
            : "bg-[#064B35] hover:bg-[#0B6B47] text-white active:scale-98"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Added to Cart</span>
          </>
        ) : product.link ? (
          <>
            <span>⚡ Instant Checkout</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2]" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
};
