'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { PRODUCT_CONFIG } from '@/config/product';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#EBAF87] text-[#1F1714]">
      {/* Header */}
      <header className="bg-[#EBAF87] py-4 border-b border-[#D49F7B]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-36">
              <Image
                src="/assets/topper_logo.png"
                alt="Topper Canvas Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#7C2928] text-white px-4 py-2 rounded-xl shadow hover:bg-[#521B18] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E2BEA2]">
          <h1 className="text-3xl sm:text-5xl font-black text-[#1F1714] mb-4">
            Contact & Support
          </h1>
          <p className="text-[#4A392F] text-base sm:text-lg mb-8 font-medium">
            We are here to assist you with any questions regarding our study kits, downloads, or payment verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Contact Options */}
            <div className="space-y-6">
              <div className="bg-[#FAF0E9] p-6 rounded-2xl border border-[#E2BEA2]">
                <div className="flex items-center gap-3 mb-2 text-[#7C2928]">
                  <Phone className="w-6 h-6 text-[#25D366]" />
                  <h3 className="font-extrabold text-lg">WhatsApp Support</h3>
                </div>
                <p className="text-sm text-[#4A392F] mb-3">
                  Fastest response time for order status and instant download support.
                </p>
                <a
                  href={`https://wa.me/919475465759`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-[#1EBE5D] transition-colors"
                >
                  Chat on WhatsApp: {PRODUCT_CONFIG.whatsappDisplay}
                </a>
              </div>

              <div className="bg-[#FAF0E9] p-6 rounded-2xl border border-[#E2BEA2]">
                <div className="flex items-center gap-3 mb-2 text-[#7C2928]">
                  <Mail className="w-6 h-6" />
                  <h3 className="font-extrabold text-lg">Email Support</h3>
                </div>
                <p className="text-sm text-[#4A392F] mb-3">
                  For corporate, bulk licensing, or general inquiries.
                </p>
                <a
                  href={`mailto:${PRODUCT_CONFIG.supportEmail}`}
                  className="inline-block bg-[#7C2928] text-white px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-[#521B18] transition-colors"
                >
                  {PRODUCT_CONFIG.supportEmail}
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-extrabold text-[#1F1714] mb-4">
                Send us a Message
              </h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-lg text-emerald-900">Message Received!</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#4A392F] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-base sm:text-sm px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#7C2928]"
                      placeholder="e.g. Priya Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#4A392F] mb-1">
                      Email or WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-base sm:text-sm px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#7C2928]"
                      placeholder="e.g. name@example.com or phone"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#4A392F] mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-base sm:text-sm px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#7C2928]"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#7C2928] hover:bg-[#521B18] text-white font-bold py-3 rounded-xl shadow transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
