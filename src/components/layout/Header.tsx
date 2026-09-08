"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NavigationMenu } from "@/components/layout/NavigationMenu";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { SearchModal } from "@/components/layout/SearchModal";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Handle scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 border-b border-[#EEEEEE] ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
          {/* Left: Mobile hamburger + Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <BrandLogo size="md" />
          </div>

          {/* Center: Desktop Navigation Links */}
          <NavigationMenu />

          {/* Right Action Icons: Search, User, Wishlist, Cart */}
          <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-5 text-[#111111] shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 rounded-full hover:bg-gray-100 hover:text-[#064B35] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* User Account */}
            <Link
              href="/account"
              className="hidden sm:inline-flex p-1.5 rounded-full hover:bg-gray-100 hover:text-[#064B35] transition-colors"
              aria-label="User Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-1.5 rounded-full hover:bg-gray-100 hover:text-[#064B35] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#78B82A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with Green Badge '3' matching screenshot */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-gray-100 hover:text-[#064B35] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#78B82A] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center leading-none shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modals and Drawers */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      <CartDrawer />
    </>
  );
};
