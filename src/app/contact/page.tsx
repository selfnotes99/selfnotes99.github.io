"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          We&apos;re Here to Help
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Have a question about sizing, styling, or a recent order? Our concierge team responds within 2 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 text-[#78B82A]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Message Sent Successfully!
              </h2>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you, {form.name}. A customer care specialist has received your inquiry and will email you back shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                }}
                className="text-xs font-bold text-[#064B35] hover:underline pt-4 block mx-auto"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-bold text-[#111111] mb-2">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Taylor"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35] bg-white cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking">Order &amp; Tracking</option>
                    <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
                    <option value="Wholesale & Press">Wholesale &amp; Press</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  How can we help? *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about what you need assistance with..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs p-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Card & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#EDE4D5] space-y-5">
            <h2 className="text-base font-bold text-[#111111]">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email Concierge</p>
                  <p className="text-gray-600">concierge@shopifyretail.com</p>
                  <p className="text-[11px] text-gray-400">Average reply: &lt; 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Toll-Free Phone</p>
                  <p className="text-gray-600">1-800-RETAIL (1-800-738-245)</p>
                  <p className="text-[11px] text-gray-400">Mon - Fri: 8am - 8pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Live Chat Hours</p>
                  <p className="text-gray-600">24/7/365 Non-Stop Support</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Design Studio &amp; HQ</p>
                  <p className="text-gray-600">410 NW 10th Ave, Portland, OR 97209</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DEC8]">
              <Link
                href="/faqs"
                className="text-xs font-bold text-[#064B35] hover:underline flex items-center gap-1"
              >
                <span>Browse Frequently Asked Questions first</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
