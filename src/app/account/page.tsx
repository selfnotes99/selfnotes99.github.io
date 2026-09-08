"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Package, MapPin, CreditCard, Bell, ChevronRight, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "payments">("orders");

  const mockOrders = [
    {
      id: "SR-88219",
      date: "May 12, 2025",
      status: "In Transit",
      statusColor: "bg-blue-100 text-blue-800",
      total: 109.98,
      items: [
        { name: "Urban Backpack", color: "Olive Green", qty: 1, price: 49.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200&auto=format&fit=crop" },
        { name: "Premium Sneakers", color: "Crisp White / Green", qty: 1, price: 59.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop" },
      ],
    },
    {
      id: "SR-77142",
      date: "April 19, 2025",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800",
      total: 69.99,
      items: [
        { name: "Minimal Watch", color: "Black / Tan Strap", qty: 1, price: 69.99, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=200&auto=format&fit=crop" },
      ],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Card Header */}
      <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-[#EDE4D5] flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#064B35] ring-2 ring-[#064B35]/20">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="Alex Taylor Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#111111]">
                Alex Taylor
              </h1>
              <span className="px-2.5 py-0.5 bg-[#EAF4D5] text-[#064B35] text-[10px] font-extrabold rounded-full">
                VIP Member
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              alex.taylor@example.com • Member since 2023
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/track-order"
            className="px-4 py-2 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            Track Recent Order
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs (3 cols) */}
        <div className="lg:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "orders"
                ? "bg-[#064B35] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Order History</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "addresses"
                ? "bg-[#064B35] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "payments"
                ? "bg-[#064B35] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4" />
              <span>Payment Cards</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* Tab Content (9 cols) */}
        <div className="lg:col-span-9">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#111111]">
                Past Orders &amp; Receipts
              </h2>

              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
                    <div>
                      <span className="font-bold text-gray-900">Order #{order.id}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-500">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
                      <span className="font-black text-sm text-gray-900">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-bold text-gray-900 truncate">{item.name}</p>
                          <p className="text-gray-500">{item.color} • Qty: {item.qty}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-800">{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Link
                      href={`/track-order?orderId=${order.id}`}
                      className="px-3 py-1.5 bg-[#F3F8E8] text-[#064B35] font-bold text-xs rounded-lg hover:bg-[#EAF4D5] transition-colors"
                    >
                      Track Package
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-[#111111]">Saved Shipping Addresses</h2>
              <div className="p-4 border-2 border-[#064B35] rounded-xl bg-[#F3F8E8]/30 max-w-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-2 py-0.5 rounded">
                  Default Address
                </span>
                <p className="font-bold text-sm text-gray-900 mt-2">Alex Taylor</p>
                <p className="text-xs text-gray-600 mt-0.5">742 Evergreen Terrace</p>
                <p className="text-xs text-gray-600">Portland, OR 97201</p>
                <p className="text-xs text-gray-600 mt-1">Phone: (503) 555-0199</p>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-[#111111]">Saved Payment Methods</h2>
              <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-[10px] tracking-wider">
                    VISA
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Visa ending in 4242</p>
                    <p className="text-gray-500">Expires 12/28</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#064B35]">Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
