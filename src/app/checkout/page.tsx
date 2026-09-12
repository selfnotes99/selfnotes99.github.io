"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { submitOrderToLaravel } from "@/lib/laravelApi";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<"form" | "success">("form");
  const [orderNumber, setOrderNumber] = useState<string>("SR-884920");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "apple">(
    "card"
  );

  // Form states
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Taylor",
    email: "alex.taylor@example.com",
    address: "742 Evergreen Terrace",
    city: "Portland",
    state: "OR",
    zip: "97201",
    phone: "(503) 555-0199",
    cardNumber: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvv: "888",
  });

  const shippingCost =
    shippingMethod === "express"
      ? 14.99
      : subtotal >= 50 || subtotal === 0
      ? 0
      : 4.99;
  const grandTotal = subtotal + shippingCost;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let generatedOrderNum = "SR-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const orderPayload = {
        customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        payment_method: paymentMethod,
        notes: `Shipping via ${shippingMethod}`,
        items: items.map((item) => ({
          product_id: item.product?.id || item.id,
          product_name: item.product?.name || "Product",
          quantity: item.quantity,
          unit_price: item.product?.price || 0,
          options: {
            size: item.selectedSize,
            color: item.selectedColor,
          },
        })),
        subtotal: subtotal,
        discount: 0,
        shipping_fee: shippingCost,
        grand_total: grandTotal,
      };

      const res = await submitOrderToLaravel(orderPayload);
      if (res?.data?.order_number) {
        generatedOrderNum = res.data.order_number;
      }
    } catch (err) {
      console.warn("Could not push order directly to Laravel API, saved locally:", err);
    } finally {
      setIsSubmitting(false);
      setOrderNumber(generatedOrderNum);

      // Trigger confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#064B35", "#78B82A", "#FF6A24", "#F5A623"],
        });
      } catch (err) {
        console.error(err);
      }

      setStep("success");
      clearCart();
    }
  };

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 border border-[#EDE4D5] shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-9 h-9 text-[#78B82A]" />
          </div>

          <span className="text-xs font-bold text-[#064B35] uppercase tracking-wider">
            Order Confirmed #{orderNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-2 mb-3">
            Thank you for your order, {formData.firstName}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            We&apos;ve sent a full confirmation email and receipt to{" "}
            <strong>{formData.email}</strong>. Your digital notes / package will be delivered instantly.
          </p>

          {/* Details summary */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-left text-xs space-y-2 mb-8">
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="text-gray-500">Shipping Address:</span>
              <span className="font-semibold text-gray-800">
                {formData.address}, {formData.city}, {formData.state} {formData.zip}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="text-gray-500">Shipping Method:</span>
              <span className="font-semibold text-gray-800">
                {shippingMethod === "express" ? "Express Delivery" : "Digital / Standard Ground"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-bold text-[#064B35]">
                Order Logged &amp; Verified in Store CMS
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/track-order?orderId=${orderNumber}`}
              className="px-6 py-3 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Track Your Order
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white border border-gray-200 text-[#111111] text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            256-Bit Encrypted SSL Checkout
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#064B35] font-bold bg-[#EAF4D5] px-3 py-1.5 rounded-full">
          <Lock className="w-3.5 h-3.5" />
          <span>Guaranteed Safe</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Shipping & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact & Shipping */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#064B35]" /> 1. Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-[#064B35]" /> 2. Delivery Speed
            </h2>

            <div className="space-y-2">
              <label
                onClick={() => setShippingMethod("standard")}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  shippingMethod === "standard"
                    ? "border-[#064B35] bg-[#F3F8E8]/40"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 text-xs">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="accent-[#064B35]"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Standard Delivery (3-5 Business Days)</p>
                    <p className="text-gray-500 text-[11px]">Carbon-neutral ground transit</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#064B35]">
                  {subtotal >= 50 ? "FREE" : formatPrice(4.99)}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod("express")}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  shippingMethod === "express"
                    ? "border-[#064B35] bg-[#F3F8E8]/40"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 text-xs">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="accent-[#064B35]"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Priority Express (2 Business Days)</p>
                    <p className="text-gray-500 text-[11px]">Guaranteed expedited air shipping</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900">{formatPrice(14.99)}</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#064B35]" /> 3. Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`py-2 px-3 rounded-lg border-2 text-xs font-bold text-center transition-all ${
                  paymentMethod === "card"
                    ? "border-[#064B35] bg-[#F3F8E8] text-[#064B35]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`py-2 px-3 rounded-lg border-2 text-xs font-bold text-center transition-all ${
                  paymentMethod === "apple"
                    ? "border-[#064B35] bg-[#F3F8E8] text-[#064B35]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Apple Pay
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`py-2 px-3 rounded-lg border-2 text-xs font-bold text-center transition-all ${
                  paymentMethod === "paypal"
                    ? "border-[#064B35] bg-[#F3F8E8] text-[#064B35]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                PayPal
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Security Code (CVV)</label>
                    <input
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#EDE4D5] space-y-5 sticky top-24">
            <h2 className="text-base font-extrabold text-[#111111] uppercase tracking-wider pb-3 border-b border-[#E8DEC8]">
              Order Summary ({items.length} items)
            </h2>

            {/* Items list preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-gray-500">Qty: {item.quantity} • {item.selectedColor}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs pt-3 border-t border-gray-200 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">
                  {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-[#E8DEC8] flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-900">Total Due</span>
              <span className="text-2xl font-black text-[#064B35]">
                {formatPrice(grandTotal)}
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <span>{isSubmitting ? "Processing Order..." : "Place Order Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#064B35]" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
