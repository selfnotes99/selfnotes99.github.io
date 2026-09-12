"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileCheck,
  Zap,
  Award,
  ShieldCheck,
  FolderArchive,
  MonitorCheck,
  HardDrive,
  RefreshCw,
  Check,
  X,
  Download,
  FileText,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Layers,
  Maximize2,
  Eye,
} from "lucide-react";
import { Product } from "@/types";

interface DigitalProductSpecsProps {
  product: Product;
}

type TabType = "contents" | "delivery" | "license" | "guarantee";

export const DigitalProductSpecs: React.FC<DigitalProductSpecsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<TabType>("contents");
  const [selectedFullImage, setSelectedFullImage] = useState<string | null>(null);

  const galleryImages =
    product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <section aria-label="Digital Product Details and Specifications" className="mb-16">
      <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-8 lg:p-10 shadow-sm">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4D5] text-[#064B35] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#78B82A]" />
            <span>Digital Asset Specifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Digital Product Details &amp; Specifications
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            Everything included in your package: source files, licensing rights, instant download pipeline &amp; technical compatibility.
          </p>
        </div>

        {/* 6 Quick-Spec Interactive Micro-Cards (Mobile 2-col, Desktop 6-col) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mb-8">
          <div className="bg-gray-50/80 hover:bg-gray-100/80 transition-colors border border-gray-100 rounded-2xl p-3 text-center">
            <FolderArchive className="w-5 h-5 text-[#064B35] mx-auto mb-1.5" />
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Format</span>
            <strong className="text-xs sm:text-[13px] font-black text-gray-900 block mt-0.5">.ZIP Bundle</strong>
          </div>

          <div className="bg-gray-50/80 hover:bg-gray-100/80 transition-colors border border-gray-100 rounded-2xl p-3 text-center">
            <Zap className="w-5 h-5 text-[#F4512A] mx-auto mb-1.5" />
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Delivery</span>
            <strong className="text-xs sm:text-[13px] font-black text-gray-900 block mt-0.5">Instant (0s)</strong>
          </div>

          <div className="bg-gray-50/80 hover:bg-gray-100/80 transition-colors border border-gray-100 rounded-2xl p-3 text-center">
            <MonitorCheck className="w-5 h-5 text-[#064B35] mx-auto mb-1.5" />
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Devices</span>
            <strong className="text-xs sm:text-[13px] font-black text-gray-900 block mt-0.5">All Platforms</strong>
          </div>

          <div className="bg-gray-50/80 hover:bg-gray-100/80 transition-colors border border-gray-100 rounded-2xl p-3 text-center">
            <HardDrive className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">File Size</span>
            <strong className="text-xs sm:text-[13px] font-black text-gray-900 block mt-0.5">~185 MB</strong>
          </div>

          <div className="bg-gray-50/80 hover:bg-gray-100/80 transition-colors border border-gray-100 rounded-2xl p-3 text-center">
            <Award className="w-5 h-5 text-[#F5A623] mx-auto mb-1.5" />
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">License</span>
            <strong className="text-xs sm:text-[13px] font-black text-gray-900 block mt-0.5">Commercial</strong>
          </div>

          <div className="bg-gray-50/80 hover:bg-gray-100/80 transition-colors border border-gray-100 rounded-2xl p-3 text-center">
            <RefreshCw className="w-5 h-5 text-[#78B82A] mx-auto mb-1.5" />
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Updates</span>
            <strong className="text-xs sm:text-[13px] font-black text-gray-900 block mt-0.5">Lifetime Free</strong>
          </div>
        </div>

        {/* Modern Mobile-Engaging Segmented Control Tabs (Horizontal Swipe on Mobile) */}
        <div className="flex items-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl max-w-2xl mx-auto mb-8 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            type="button"
            onClick={() => setActiveTab("contents")}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all select-none ${
              activeTab === "contents"
                ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <FolderArchive className="w-4 h-4 text-[#064B35]" />
            <span>What&apos;s Inside</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("delivery")}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all select-none ${
              activeTab === "delivery"
                ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <Zap className="w-4 h-4 text-[#F4512A]" />
            <span>How It Works</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("license")}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all select-none ${
              activeTab === "license"
                ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <Award className="w-4 h-4 text-[#F5A623]" />
            <span>Commercial Rights</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guarantee")}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all select-none ${
              activeTab === "guarantee"
                ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#78B82A]" />
            <span>30-Day Guarantee</span>
          </button>
        </div>

        {/* Tab 1: What's Inside & Digital Package Contents */}
        {activeTab === "contents" && (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#F5F9ED] to-white border border-[#D5E8B5]/60 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#064B35] text-white flex items-center justify-center font-black text-xs">
                    1
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                    Master Asset Source Bundle
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Uncompressed master vector files, layered source graphics, templates, and high-fidelity project files.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700">.ZIP</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700">4K Ultra HD</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700">100% Layered</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50/50 to-white border border-orange-100 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#F4512A] text-white flex items-center justify-center font-black text-xs">
                    2
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                    PDF Quickstart &amp; Video Guide
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Step-by-step onboarding walkthrough, recommended setup instructions, and cheat sheet for immediate productivity.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700">PDF Guide</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700">Beginner Friendly</span>
                </div>
              </div>
            </div>

            {/* Checklist of Features Included in this Product */}
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/70">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#064B35]" />
                <span>Features Included in {product.name}</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                    <span className="w-4 h-4 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Instant unmetered cloud download access</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Future updates included at zero additional cost</span>
                </div>
              </div>
            </div>

            {/* Sample Images Showcase Gallery (50% Larger 4-Column Responsive Grid) */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#064B35]" />
                  <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-gray-900 flex items-center gap-2.5">
                    <span>Sample Images</span>
                    <span className="text-xs font-bold text-[#064B35] bg-[#EAF4D5] px-2.5 py-0.5 rounded-full">
                      {galleryImages.length} Photos
                    </span>
                  </h4>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  Hover or tap with finger to view full image
                </span>
              </div>

              {/* 4-Column Grid (50% larger than 6-column) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedFullImage(img)}
                    className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-white border-2 border-gray-200/80 hover:border-[#064B35] cursor-pointer transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 p-1.5"
                    title="Click or tap to view full image"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} sample ${idx + 1}`}
                      fill
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Hover / Touch Overlay */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-3">
                      <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center mb-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-white">
                        Full Image
                      </span>
                    </div>

                    {/* Photo Index Badge */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/65 backdrop-blur-xs text-white text-xs font-mono font-bold rounded-lg select-none">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: How It Works & Instant Delivery */}
        {activeTab === "delivery" && (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#064B35] to-[#0B6B47] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                    Instant 1-Click Checkout ⚡
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Click Instant Checkout. You will be seamlessly directed to a secure, encrypted checkout page with card, UPI, or PayPal options.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F4512A] to-[#FF6A24] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                    Immediate Screen Download + Email Backup 📩
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    As soon as payment succeeds, your high-speed download link pops up on your screen. An automated backup copy is dispatched to your email within 10 seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#78B82A] to-[#88D030] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                    Unzip &amp; Start Creating Immediately 🚀
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Double-click the .ZIP folder to unzip on Mac or Windows. No subscriptions, no software lock-in, no recurring charges. Yours forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Commercial Rights & Licensing Comparison */}
        {activeTab === "license" && (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-emerald-950">
                    What You CAN Do (Included)
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-emerald-900/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Use in unlimited commercial &amp; client projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Use in digital ads, social media, websites &amp; print</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Modify, customize, recolor, and blend assets freely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Perpetual lifetime license with zero ongoing royalties</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-black">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-red-950">
                    What You CANNOT Do
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-red-900/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Do not re-sell or redistribute the raw source files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Do not share download links publicly on open web</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Do not sub-license the master bundle as a stock item</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: 30-Day Guarantee & Customer Trust */}
        {activeTab === "guarantee" && (
          <div className="max-w-2xl mx-auto text-center animate-fadeIn py-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 text-[#F5A623] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShieldCheck className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-xl font-black text-gray-900">
              100% Risk-Free 30-Day Money Back Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed max-w-lg mx-auto">
              We take pride in our digital craftsmanship. If you experience any technical glitch, missing files, or if this digital product does not match what you expected, send us a quick message within 30 days of purchase for an instant full refund.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-[#064B35] bg-[#EAF4D5] px-4 py-2 rounded-xl">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Zero Risk • No Hassle • 100% Buyer Protected</span>
            </div>
          </div>
        )}

        {/* Live Status Pill at Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Digital Servers Online • Instant Download Ready</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">
            SSL 256-Bit Encrypted • Verified Digital Delivery
          </span>
        </div>
      </div>

      {/* Full Image Modal Lightbox on Click / Touch */}
      {selectedFullImage && (
        <div
          onClick={() => setSelectedFullImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFullImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all cursor-pointer z-50 flex items-center gap-1.5 text-xs font-bold px-3.5 shadow-lg"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>

            {/* Full High-Resolution Uncropped Image */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[88vh] rounded-3xl overflow-hidden bg-black/90 border border-white/20 shadow-2xl flex items-center justify-center p-2">
              <Image
                src={selectedFullImage}
                alt="Full Sample Image"
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </div>

            <div className="flex items-center justify-between w-full px-2 mt-3 text-white/90 text-xs">
              <span className="font-bold truncate max-w-xs">{product.name}</span>
              <span className="text-[11px] text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
                Full Resolution Sample Preview
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
