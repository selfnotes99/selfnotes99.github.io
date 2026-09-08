"use client";

import React, { useState, useEffect } from "react";
import { Flame, Clock, Zap, Users } from "lucide-react";

interface DigitalProductCountdownProps {
  discount?: string;
  stock?: number;
}

export const DigitalProductCountdown: React.FC<DigitalProductCountdownProps> = ({
  discount = "50% OFF",
  stock = 14,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 36,
    seconds: 48,
  });

  const [activeViewers, setActiveViewers] = useState(19);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Subtle viewer count fluctuation for realism
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 14 ? 16 : next > 28 ? 24 : next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const claimedPercent = Math.min(94, Math.max(72, 100 - (stock || 10) * 2));

  return (
    <div className="bg-gradient-to-r from-[#FFF5F2] via-[#FFF9EF] to-[#F2F8EE] border border-[#FFD9CC] rounded-2xl p-4 sm:p-5 shadow-xs select-none">
      {/* Top row: Live viewers & urgency pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#F0E5D8]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F4512A]"></span>
          </span>
          <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#F4512A]" />
            <strong className="text-[#F4512A] font-extrabold">{activeViewers} people</strong> are viewing this right now
          </span>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#F4512A] text-white shadow-xs">
          <Zap className="w-3 h-3 fill-yellow-300 text-yellow-300" />
          Limited Time Offer
        </span>
      </div>

      {/* Countdown Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <Clock className="w-4 h-4 text-[#F4512A] animate-pulse" />
            <span>Special Promotional Pricing Ends In:</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Regular price restores when countdown reaches zero.
          </p>
        </div>

        {/* Digital Clocks */}
        <div className="flex items-center gap-1.5">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-[#111111] text-white font-mono font-black text-base flex items-center justify-center shadow-sm">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase mt-1">Hrs</span>
          </div>

          <span className="font-bold text-gray-700 text-lg mb-4">:</span>

          {/* Mins */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-[#111111] text-white font-mono font-black text-base flex items-center justify-center shadow-sm">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase mt-1">Min</span>
          </div>

          <span className="font-bold text-gray-700 text-lg mb-4">:</span>

          {/* Secs */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-[#F4512A] text-white font-mono font-black text-base flex items-center justify-center shadow-sm animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <span className="text-[9px] font-bold text-[#F4512A] uppercase mt-1">Sec</span>
          </div>
        </div>
      </div>

      {/* Scarcity Bar */}
      <div className="mt-3 pt-3 border-t border-[#F0E5D8]">
        <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
          <span className="text-gray-700 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#F4512A] fill-[#F4512A]" />
            Claimed Discount: <strong className="text-[#F4512A]">{claimedPercent}% Sold</strong>
          </span>
          <span className="text-[#064B35] font-black">
            ⚡ Only {stock > 0 ? stock : 5} spots left!
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#F4512A] via-[#FF6A24] to-[#78B82A] h-full rounded-full transition-all duration-1000"
            style={{ width: `${claimedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
