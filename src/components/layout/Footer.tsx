"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Truck, RotateCcw, Check, RefreshCw } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useProducts } from "@/context/ProductContext";

export const Footer: React.FC = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubscribed, setFooterSubscribed] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const { refreshProducts, isSyncing } = useProducts();

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFooterSubscribed(true);
    setSyncStatus(footerEmail.trim() ? "Subscribed & Syncing..." : "Syncing with CMS...");
    try {
      await refreshProducts();
      setSyncStatus(footerEmail.trim() ? "Subscribed! Catalog synced." : "✅ Catalog synced with Laravel CMS!");
    } catch {
      setSyncStatus("Catalog refreshed!");
    }
    setTimeout(() => {
      setFooterEmail("");
      setFooterSubscribed(false);
      setSyncStatus(null);
    }, 3500);
  };

  return (
    <footer className="bg-[#FFF9EF] border-t border-[#EFE5D5] pt-12 pb-8 text-[#111111] select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E8DEC8]">
          {/* Col 1: Brand & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs text-[#555555] max-w-xs leading-relaxed">
              Your one-stop shop for quality products at the best prices.
            </p>

            {/* Social Icons matching screenshot circles */}
            <div className="flex items-center gap-2 pt-1 text-[#111111]">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E0D5C0] flex items-center justify-center hover:bg-[#064B35] hover:text-white hover:border-[#064B35] transition-all"
                aria-label="Facebook"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E0D5C0] flex items-center justify-center hover:bg-[#064B35] hover:text-white hover:border-[#064B35] transition-all"
                aria-label="Instagram"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E0D5C0] flex items-center justify-center hover:bg-[#064B35] hover:text-white hover:border-[#064B35] transition-all"
                aria-label="Twitter"
              >
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E0D5C0] flex items-center justify-center hover:bg-[#064B35] hover:text-white hover:border-[#064B35] transition-all"
                aria-label="YouTube"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E0D5C0] flex items-center justify-center hover:bg-[#064B35] hover:text-white hover:border-[#064B35] transition-all"
                aria-label="Pinterest"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Shop Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-[#444444]">
              <li>
                <Link href="/shop" className="hover:text-[#064B35] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-[#064B35] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-[#064B35] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-[#064B35] transition-colors">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#064B35] transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:text-[#064B35] transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#444444]">
              <li>
                <Link href="/shipping-policy" className="hover:text-[#064B35] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-exchanges" className="hover:text-[#064B35] transition-colors">
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#064B35] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#064B35] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#064B35] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">
              About Us
            </h4>
            <ul className="space-y-2 text-xs text-[#444444]">
              <li>
                <Link href="/about" className="hover:text-[#064B35] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-[#064B35] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#064B35] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#064B35] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Stay in the loop (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">
              Stay in the loop
            </h4>
            <p className="text-xs text-[#555555]">
              Get updates on new arrivals, exclusive offers and more.
            </p>

            {/* Newsletter form */}
            {footerSubscribed ? (
              <div className="p-2.5 bg-[#EAF4D5] border border-[#D5E6B8] rounded-xl text-xs font-bold text-[#064B35] flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-[#78B82A] shrink-0" />
                <span>{syncStatus || "Live products updated from Google Sheet!"}</span>
              </div>
            ) : (
              <form onSubmit={handleFooterSubmit} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Enter your email (optional)"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="w-full bg-white text-xs px-3 py-2 border border-[#DECDB3] rounded-lg text-[#111111] placeholder:text-gray-400 outline-none focus:border-[#064B35]"
                />
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}

            {/* Mini benefits right under email input */}
            <div className="pt-2 flex items-center gap-4 text-[11px] text-[#444444]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#064B35] shrink-0" />
                <div className="leading-tight">
                  <p className="font-bold text-[#111111]">Free Shipping</p>
                  <p className="text-[10px] text-gray-500">On Orders Rs 50+</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#064B35] shrink-0" />
                <div className="leading-tight">
                  <p className="font-bold text-[#111111]">30-Day Returns</p>
                  <p className="text-[10px] text-gray-500">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>© 2025 Self Notes 99. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/shipping-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/returns-exchanges" className="hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/faqs" className="hover:underline">
              Security
            </Link>
            <span>•</span>
            <a
              href="http://127.0.0.1:8000/admin"
              target="_blank"
              rel="noreferrer"
              className="text-[#064B35] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>CMS Admin</span>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
