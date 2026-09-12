"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyQhFYBYHjjM613YdmzXAkrko3aiPNUhANmo06TUg9nhatjoR5a3deI1c0vUMDCK1BD8Q/exec";

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Have a question about an order, need CBSE notes recommendations, or require custom support? Our dedicated team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#EDE4D5]">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Message Received!</h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto">
                Thank you for reaching out, {form.name}. Our student support team will reply to <strong>{form.email}</strong> within 2 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "General Inquiry",
                    message: "",
                  });
                }}
                className="mt-4 px-4 py-2 bg-[#064B35] text-white text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
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
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#064B35] cursor-pointer"
                  >
                    <option value="CBSE Notes Inquiry">CBSE Notes Inquiry</option>
                    <option value="Order Status & Downloads">Order Status &amp; Downloads</option>
                    <option value="Syllabus & Chapters">Syllabus &amp; Chapters</option>
                    <option value="Payment & Refunds">Payment &amp; Refunds</option>
                    <option value="Other Assistance">Other Assistance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can our study consultants help you today? Please include your order ID if inquiring about a purchase..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs p-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#064B35] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Sending message..." : "Send Message to Support"}</span>
                <ArrowRight className="w-4 h-4" />
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
                  <p className="font-bold text-gray-900">Email Support</p>
                  <p className="text-gray-600">help@selfnotes99.com</p>
                  <p className="text-[11px] text-gray-400">Average reply: &lt; 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">WhatsApp &amp; Helpline</p>
                  <p className="text-gray-600">+91-8595403030</p>
                  <p className="text-[11px] text-gray-400">Mon - Sat: 9am - 8pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Instant Download Access</p>
                  <p className="text-gray-600">24/7/365 Automated Delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#EAF4D5] text-[#064B35] rounded-xl shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Registered Office</p>
                  <p className="text-gray-600">SECTOR 22 A, MOLAHERA GURUGRAM, HARYANA 122015, INDIA</p>
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
