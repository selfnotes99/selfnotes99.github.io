"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Package, Truck, CheckCircle2, Clock, MapPin, Search } from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "SR-88219";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [email, setEmail] = useState("alex.taylor@example.com");
  const [searched, setSearched] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const timeline = [
    { title: "Order Placed & Confirmed", date: "May 12, 10:30 AM", completed: true },
    { title: "Packed at Central Fulfillment Hub", date: "May 12, 04:15 PM", completed: true },
    { title: "Dispatched via FedEx Carbon-Neutral Express", date: "May 13, 08:45 AM", completed: true, active: true },
    { title: "Out for Local Delivery", date: "Estimated May 15", completed: false },
    { title: "Delivered to Doorstep", date: "Estimated May 15, by 7 PM", completed: false },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          Real-Time Tracking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Enter your Order ID and email address to view live carrier milestones.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleTrack}
        className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
      >
        <div className="sm:col-span-5">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Order ID
          </label>
          <input
            type="text"
            required
            placeholder="e.g. SR-88219"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
          />
        </div>
        <div className="sm:col-span-5">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Billing / Shipping Email
          </label>
          <input
            type="email"
            required
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </div>
      </form>

      {/* Results Timeline */}
      {searched && (
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#EDE4D5] space-y-6 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8DEC8]">
            <div>
              <span className="text-[11px] font-bold text-[#064B35] uppercase tracking-wider">
                Active Tracking
              </span>
              <h2 className="text-lg font-bold text-[#111111]">
                Order #{orderId.toUpperCase()}
              </h2>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#EAF4D5] text-[#064B35] text-xs font-bold rounded-full">
                In Transit (On Schedule)
              </span>
              <p className="text-xs text-gray-500 mt-1">Carrier: FedEx #9400 1102 0088 2911</p>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {timeline.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    step.completed
                      ? "bg-[#064B35] border-[#064B35] text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold ${
                      step.active
                        ? "text-[#064B35] underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{step.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping destination info */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3 text-xs text-gray-700">
            <MapPin className="w-5 h-5 text-[#064B35] shrink-0" />
            <div>
              <p className="font-bold text-gray-900">Delivery Destination:</p>
              <p className="text-gray-600">742 Evergreen Terrace, Portland, OR 97201</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-8 text-center text-xs">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
