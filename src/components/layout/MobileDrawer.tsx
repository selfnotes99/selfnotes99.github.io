"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, Heart, ShoppingBag, Search, Phone, Mail, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { navItems, shopDropdownLinks, collectionsDropdownLinks } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const [shopExpanded, setShopExpanded] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="p-4 pb-2">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 rounded-xl text-xs text-gray-400 border border-gray-200"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <span>Search products, categories...</span>
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-gray-100">
          <div className="space-y-1 py-2">
            {navItems.map((item) => {
              if (item.hasDropdown && item.dropdownType === "shop") {
                return (
                  <div key={item.label} className="py-1">
                    <button
                      onClick={() => setShopExpanded(!shopExpanded)}
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#111111] hover:text-[#064B35]"
                    >
                      <span>Shop</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          shopExpanded ? "rotate-180 text-[#064B35]" : ""
                        }`}
                      />
                    </button>
                    {shopExpanded && (
                      <div className="pl-3 py-1 space-y-1 bg-[#F3F8E8]/40 rounded-lg my-1">
                        {shopDropdownLinks.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={onClose}
                            className={`block py-1.5 px-2 text-xs rounded-md font-medium ${
                              link.highlight
                                ? "text-[#F4512A] font-bold"
                                : "text-gray-700 hover:text-[#064B35]"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.hasDropdown && item.dropdownType === "collections") {
                return (
                  <div key={item.label} className="py-1">
                    <button
                      onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#111111] hover:text-[#064B35]"
                    >
                      <span>Collections</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          collectionsExpanded ? "rotate-180 text-[#064B35]" : ""
                        }`}
                      />
                    </button>
                    {collectionsExpanded && (
                      <div className="pl-3 py-1 space-y-1 bg-[#F3F8E8]/40 rounded-lg my-1">
                        {collectionsDropdownLinks.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={onClose}
                            className="block py-1.5 px-2 text-xs text-gray-700 hover:text-[#064B35] font-medium"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="block py-2.5 text-sm font-semibold text-[#111111] hover:text-[#064B35] transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Quick Category Highlights */}
          <div className="py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Popular Highlights
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/deals"
                onClick={onClose}
                className="p-2 rounded-lg bg-[#FFF5E5] text-[#FF6A24] font-bold flex items-center justify-between"
              >
                <span>🔥 Flash Deals</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link
                href="/new-arrivals"
                onClick={onClose}
                className="p-2 rounded-lg bg-[#EAF4D5] text-[#064B35] font-bold flex items-center justify-between"
              >
                <span>✨ New 2025</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Account & Wishlist quick access */}
          <div className="py-3 space-y-2">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-xs font-semibold text-gray-700 hover:text-[#064B35]"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#064B35]" />
                <span>Wishlist</span>
              </div>
              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[11px] font-bold text-gray-600">
                {wishlistCount}
              </span>
            </Link>

            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2 py-2 text-xs font-semibold text-gray-700 hover:text-[#064B35]"
            >
              <span>My Account & Orders</span>
            </Link>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#064B35]" />
            <span>1-800-RETAIL (24/7 Support)</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#064B35]" />
            <span>concierge@shopifyretail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
