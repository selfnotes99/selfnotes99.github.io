"use client";

import React, { useState } from "react";
import { Mail, Gift, CheckCircle2 } from "lucide-react";

export const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Dark Forest Green Rounded Rectangle */}
      <div className="bg-[#064B35] rounded-2xl p-6 sm:p-7 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Mail icon in circle + Title & Subtitle (4 cols) */}
          <div className="lg:col-span-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0 text-white bg-white/5">
              <Mail className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                Join Our Newsletter
              </h3>
              <p className="text-xs sm:text-[13px] text-white/80 mt-0.5 font-normal">
                Get 10% off on your first order!
              </p>
            </div>
          </div>

          {/* Center: Email Input + Orange Subscribe Button (5 cols) */}
          <div className="lg:col-span-4">
            {subscribed ? (
              <div className="flex items-center gap-2 text-white bg-[#0B6B47] py-2.5 px-4 rounded-xl text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#78B82A]" />
                <span>You&apos;re subscribed! Check your inbox for your 10% off code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white text-[#111111] placeholder:text-gray-400 text-xs sm:text-sm px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[#78B82A] transition-all"
                />
                <button
                  type="submit"
                  className="bg-[#FF6A24] hover:bg-[#E55B1B] active:scale-98 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all shrink-0 shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Right: Divider + Gift Icon with Offers text (3 cols) */}
          <div className="hidden lg:flex lg:col-span-3 items-center justify-end gap-3 pl-4 border-l border-white/20">
            <div className="text-[#78B82A] shrink-0">
              <Gift className="w-8 h-8 stroke-[1.75]" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-white tracking-wide">
                Exclusive Offers
              </span>
              <span className="text-xs font-semibold text-white/80">
                &amp; New Arrivals
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
