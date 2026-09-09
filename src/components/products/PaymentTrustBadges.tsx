"use client";

import React from "react";
import { ShieldCheck, Zap, Lock, MessageCircle, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";

interface PaymentTrustBadgesProps {
  product: Product;
  className?: string;
}

export const PaymentTrustBadges: React.FC<PaymentTrustBadgesProps> = ({
  product,
  className = "",
}) => {
  const whatsappNumber = "918595403030";
  const whatsappMessage = encodeURIComponent(
    `Hi selfnotes99! I am on your website looking at "${product.name}" and have a quick query before buying. Can you please help?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className={`space-y-3 pt-2 ${className}`}>
      {/* Visual Payment Gateway Badges Box */}
      <div className="bg-[#FAFDF8] border border-[#DCE8CF] rounded-2xl p-3.5 sm:p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2.5">
          <Lock className="w-3.5 h-3.5 text-[#064B35]" />
          <span className="text-[11px] font-black uppercase tracking-wider text-[#064B35]">
            Guaranteed Safe &amp; Secure Indian Checkout
          </span>
        </div>

        {/* Brand Payment Pills / Logos */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
          {/* UPI Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-2xs font-extrabold text-[11px] text-[#282C3F]">
            <span className="w-2 h-2 rounded-full bg-[#00B9F1]" />
            UPI
          </span>

          {/* Google Pay */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-2xs font-extrabold text-[11px] text-[#4285F4]">
            GPay
          </span>

          {/* PhonePe */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-2xs font-extrabold text-[11px] text-[#5F259F]">
            PhonePe
          </span>

          {/* Paytm */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-2xs font-extrabold text-[11px] text-[#002E6E]">
            Paytm
          </span>

          {/* RuPay */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-2xs font-extrabold text-[11px] text-[#006699]">
            RuPay
          </span>

          {/* Visa / Master */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-2xs font-extrabold text-[11px] text-gray-700">
            Cards / NetBanking
          </span>
        </div>

        {/* 3 Core Trust Guarantees */}
        <div className="grid grid-cols-3 gap-1.5 pt-3 mt-3 border-t border-[#E6EEDC] text-[10px] sm:text-[11px] font-bold text-gray-700">
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-[#78B82A] shrink-0" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center justify-center gap-1 border-x border-[#E6EEDC] px-1">
            <ShieldCheck className="w-3 h-3 text-[#064B35] shrink-0" />
            <span>256-Bit SSL</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#F5A623] shrink-0" />
            <span>30-Day Policy</span>
          </div>
        </div>
      </div>

      {/* Direct WhatsApp Pre-Purchase Help Pill */}
      <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl sm:rounded-2xl transition-all hover:bg-emerald-50">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-[11px] sm:text-xs font-black text-emerald-950 truncate">
              Have doubts before buying?
            </p>
            <p className="text-[10px] text-emerald-700 truncate">
              Chat directly with our team on WhatsApp (Reply in &lt;5 mins)
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-[11px] shadow-xs shrink-0 transition-transform active:scale-95"
        >
          <span>Chat Now</span>
        </a>
      </div>
    </div>
  );
};
