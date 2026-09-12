"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { navItems, shopDropdownLinks, collectionsDropdownLinks } from "@/data/navigation";

export const NavigationMenu: React.FC = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-7 xl:gap-8 font-medium text-[13.5px] text-[#111111]">
      {navItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        // Dropdown menu for Shop
        if (item.hasDropdown && item.dropdownType === "shop") {
          return (
            <div
              key={item.label}
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown("shop")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 transition-colors hover:text-[#064B35] font-semibold ${
                  isActive ? "text-[#064B35]" : "text-[#111111]"
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {/* Mega / Card Dropdown */}
              {activeDropdown === "shop" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white rounded-2xl shadow-dropdown border border-gray-100 p-5 grid grid-cols-2 gap-3">
                    {shopDropdownLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`p-2.5 rounded-xl transition-all flex flex-col justify-between ${
                          link.highlight
                            ? "bg-[#FFF5E5] hover:bg-[#FFEBD0] border border-[#FFD9B3]"
                            : "hover:bg-[#F3F8E8] border border-transparent"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            link.highlight ? "text-[#F4512A]" : "text-[#111111] hover:text-[#064B35]"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span className="text-[11px] text-gray-400 mt-0.5">{link.count}</span>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">Free delivery on orders over Rs 50</span>
                      <Link
                        href="/shop"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[#064B35] font-bold hover:underline flex items-center gap-1"
                      >
                        Explore all categories <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Dropdown menu for Collections
        if (item.hasDropdown && item.dropdownType === "collections") {
          return (
            <div
              key={item.label}
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown("collections")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 transition-colors hover:text-[#064B35] font-semibold ${
                  isActive ? "text-[#064B35]" : "text-[#111111]"
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {activeDropdown === "collections" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[340px] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white rounded-2xl shadow-dropdown border border-gray-100 p-4 space-y-1">
                    {collectionsDropdownLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block p-2.5 rounded-xl hover:bg-[#F3F8E8] transition-colors group/item"
                      >
                        <div className="text-xs font-bold text-[#111111] group-hover/item:text-[#064B35] flex items-center justify-between">
                          <span>{link.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{link.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Standard Nav Links
        return (
          <div key={item.label} className="relative py-2">
            <Link
              href={item.href}
              className={`transition-colors hover:text-[#064B35] font-semibold ${
                isActive ? "text-[#064B35]" : "text-[#111111]"
              }`}
            >
              {item.label}
            </Link>
            {/* Active Green Underline matching screenshot */}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#064B35] rounded-full" />
            )}
          </div>
        );
      })}
    </nav>
  );
};
