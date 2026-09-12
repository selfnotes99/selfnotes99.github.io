"use client";

import React, { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import {
  Server,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  X,
  HelpCircle,
  Database,
  ShieldCheck,
  Package,
} from "lucide-react";

export function GoogleSheetSyncBadge() {
  const {
    source,
    rowCount,
    apiUrl,
    adminUrl,
    lastSynced,
    isSyncing,
    refreshProducts,
  } = useProducts();

  const [isOpen, setIsOpen] = useState(false);
  const [justSynced, setJustSynced] = useState(false);

  const handleSync = async () => {
    try {
      await refreshProducts();
      setJustSynced(true);
      setTimeout(() => setJustSynced(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Floating Action Pill bottom-left */}
      <div className="fixed bottom-5 left-5 z-40">
        <div className="bg-[#064B35] text-white shadow-xl rounded-full p-1 pl-3.5 pr-2 flex items-center gap-2.5 border border-white/20 text-xs backdrop-blur-md transition-all hover:shadow-2xl">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 font-medium hover:text-[#EAF4D5] transition-colors"
            title="Laravel CMS Live Connection Status"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#78B82A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#78B82A]"></span>
            </span>
            <Server className="w-4 h-4 text-[#78B82A]" />
            <span className="hidden sm:inline font-semibold">Laravel CMS:</span>
            <span className="text-[#EAF4D5] font-mono">
              {source === "laravel_api" ? "Live API" : "Connected (Local Cache)"}
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded-full text-[11px]">
              {rowCount} items
            </span>
          </button>

          <div className="h-3.5 w-px bg-white/20"></div>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 text-white hover:text-[#EAF4D5]"
            title="Sync products from Laravel CMS API now"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#78B82A]" : ""}`} />
          </button>

          <a
            href={adminUrl || "http://127.0.0.1:8000/admin"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-[#EAF4D5]/90 hover:text-white"
            title="Open Laravel Admin Panel"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Modal Guide & Status */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden text-[#111111] animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-[#064B35] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#78B82A]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Laravel CMS &amp; Database Integration</h3>
                  <p className="text-xs text-white/75">SelfNotes99 Complete E-Commerce Backend</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Status Box */}
              <div className="bg-[#F6F8F5] border border-gray-200 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">CMS API Status:</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#064B35]">
                    <CheckCircle2 className="w-4 h-4 text-[#78B82A]" />
                    {source === "laravel_api"
                      ? "Connected to Live Laravel API"
                      : "Using Instant Local Cache (0ms Reload)"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">API Endpoint:</span>
                  <span className="font-mono text-xs text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {apiUrl || "http://127.0.0.1:8000/api"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Database:</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
                    <Database className="w-3.5 h-3.5 text-[#064B35]" />
                    MySQL (selfnotes99 / XAMPP)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Catalog Count:</span>
                  <span className="font-bold text-gray-900">{rowCount} Products in Store</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Last Synced:</span>
                  <span className="text-gray-600 font-mono text-[11px]">
                    {new Date(lastSynced).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Admin Panel Direct Link Box */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#064B35]">
                    <ShieldCheck className="w-4 h-4 text-[#78B82A]" />
                    <span>Admin Panel Access</span>
                  </div>
                  <a
                    href={adminUrl || "http://127.0.0.1:8000/admin"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#064B35] hover:bg-[#0B6B47] px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                  >
                    <span>Open Admin CMS</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-[11px] text-gray-600 space-y-0.5">
                  <p>Email: <strong className="text-gray-900 font-mono">admin@selfnotes99.com</strong></p>
                  <p>Password: <strong className="text-gray-900 font-mono">admin123456</strong></p>
                </div>
              </div>

              {/* CMS Features Summary */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Manage Complete Store via Laravel CMS:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 leading-relaxed">
                  <li className="flex items-center gap-2">
                    <span className="text-[#064B35] font-bold">•</span>
                    <span><strong>Products &amp; Notes:</strong> Add/edit titles, prices (Rs), syllabus chapters, and photos.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#064B35] font-bold">•</span>
                    <span><strong>Categories:</strong> Organize notes by CBSE classes and subjects.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#064B35] font-bold">•</span>
                    <span><strong>Orders:</strong> View live checkouts, customer details, and update fulfillment.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#064B35] font-bold">•</span>
                    <span><strong>Social Proof:</strong> Customize recent buyer popup notifications.</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Sync Button */}
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full py-3 rounded-xl bg-[#78B82A] text-white font-bold text-sm hover:bg-[#68a123] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing
                  ? "Syncing with Laravel API..."
                  : justSynced
                  ? "✓ Synced Successfully!"
                  : "Sync Live Catalog Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
