"use client";

import React, { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import {
  FileSpreadsheet,
  RefreshCw,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  HelpCircle,
  Image as ImageIcon
} from "lucide-react";

export function GoogleSheetSyncBadge() {
  const {
    source,
    rowCount,
    sheetUrl,
    lastSynced,
    isSyncing,
    refreshProducts,
    error,
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
            title="Google Sheet Live Connection Status"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#78B82A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#78B82A]"></span>
            </span>
            <FileSpreadsheet className="w-4 h-4 text-[#78B82A]" />
            <span className="hidden sm:inline font-semibold">Google Sheet:</span>
            <span className="text-[#EAF4D5] font-mono">
              {source === "google_sheet" ? "Live Sheet" : "Connected (SelfNotes99)"}
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
            title="Sync products from Google Sheet now"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#78B82A]" : ""}`} />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-[#EAF4D5]/80 hover:text-white"
            title="Open Sheet Details & Template"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
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
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Google Sheet Product Sync</h3>
                  <p className="text-xs text-white/75">SelfNotes99 Live Integration</p>
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
              <div className="bg-[#F6F8F5] border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Live Status:</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#064B35]">
                    <CheckCircle2 className="w-4 h-4 text-[#78B82A]" />
                    {source === "google_sheet"
                      ? "Directly Loaded from Google Sheet"
                      : "Connected (Awaiting sheet rows / Fallback active)"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Products Loaded:</span>
                  <span className="font-bold text-gray-900">{rowCount} Products</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Minimum Photos:</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#064B35]">
                    <ImageIcon className="w-3.5 h-3.5 text-[#78B82A]" />
                    4+ Photos guaranteed per product
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Last Synced:</span>
                  <span className="text-gray-600 font-mono text-[11px]">
                    {new Date(lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#064B35] text-white text-xs font-semibold hover:bg-[#0B6B47] transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Your Sheet
                </a>

                <a
                  href="/google-sheet-products-template.csv"
                  download="google-sheet-products-template.csv"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EAF4D5] text-[#064B35] text-xs font-bold hover:bg-[#d8eab3] transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download 4-Photo CSV
                </a>
              </div>

              {/* Instructions */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  How to populate your Google Sheet:
                </h4>
                <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>
                    Open your sheet link:{" "}
                    <a
                      href={sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#064B35] underline font-medium"
                    >
                      SelfNotes99 Google Sheet
                    </a>
                  </li>
                  <li>
                    Click <strong className="text-gray-900">File &rarr; Import &rarr; Upload</strong> and choose{" "}
                    <strong className="text-gray-900">google-sheet-products-template.csv</strong>.
                  </li>
                  <li>
                    Select <strong className="text-gray-900">"Replace current sheet"</strong> or append rows.
                  </li>
                  <li>
                    Each product includes columns: <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">Title, Price, OldPrice, Category, Description, Image 1, Image 2, Image 3, Image 4...</code>
                  </li>
                  <li>
                    Click the <strong className="text-[#064B35]">Sync Now</strong> button below to see your products appear across the website instantly!
                  </li>
                </ol>
              </div>

              {/* Bottom Sync Button */}
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full py-3 rounded-xl bg-[#78B82A] text-white font-bold text-sm hover:bg-[#68a123] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing with Google Sheets..." : justSynced ? "✓ Synced Successfully!" : "Sync Live Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
