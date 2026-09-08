import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-[#F3F8E8] text-[#064B35] flex items-center justify-center mb-4">
        <ShoppingBag className="w-8 h-8 text-[#78B82A]" />
      </div>
      <span className="text-xs font-bold text-[#78B82A] uppercase tracking-wider">
        404 — Page Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-2 mb-3">
        Looks like you took a wrong turn
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-6">
        The item, collection, or page you are looking for might have been moved or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Storefront</span>
      </Link>
    </div>
  );
}
