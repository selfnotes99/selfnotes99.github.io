import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", size = "md" }) => {
  const iconSizes = {
    sm: "w-7 h-8",
    md: "w-8 h-9",
    lg: "w-10 h-11",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group transition-transform active:scale-95 ${className}`}
      aria-label="ShopifyRetail Home"
    >
      {/* Original Green Shopping Bag Icon inspired by screenshot */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 40 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Bag Handle */}
          <path
            d="M13 13V9C13 5.13401 16.134 2 20 2C23.866 2 27 5.13401 27 9V13"
            stroke="#5F9B23"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bag Body */}
          <path
            d="M6 12C6 10.8954 6.89543 10 8 10H32C33.1046 10 34 10.8954 34 12L37.2 38.4C37.35 39.6 36.4 40.6 35.2 40.6H4.8C3.6 40.6 2.65 39.6 2.8 38.4L6 12Z"
            fill="#78B82A"
          />
          {/* Subtle shade gradient on right fold */}
          <path
            d="M20 10H32C33.1046 10 34 10.8954 34 12L37.2 38.4C37.35 39.6 36.4 40.6 35.2 40.6H20V10Z"
            fill="#68A522"
            opacity="0.25"
          />
          {/* Clean 'S' inside bag */}
          <path
            d="M23.5 18.5C22.8 17.6 21.6 17.2 20.2 17.2C17.6 17.2 15.8 18.8 15.8 21C15.8 24.5 24.5 23.5 24.5 28.5C24.5 31.8 21.8 33.5 18.8 33.5C16.8 33.5 15.2 32.7 14.2 31.2"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography: Shopify in black, Retail in green */}
      <span className={`font-bold tracking-tight select-none flex items-center ${textSizes[size]}`}>
        <span className="text-[#111111] font-extrabold">Shopify</span>
        <span className="text-[#78B82A] font-extrabold">Retail</span>
      </span>
    </Link>
  );
};
