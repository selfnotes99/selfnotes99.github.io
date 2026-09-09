"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Product } from "@/types";

interface ProductFAQProps {
  product: Product;
  className?: string;
}

interface FAQItem {
  question: string;
  answer: string;
  tag?: string;
}

export const ProductFAQ: React.FC<ProductFAQProps> = ({ product, className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const faqs: FAQItem[] = [
    {
      question: `Payment ke baad mujhe "${product.name}" kaise milega?`,
      tag: "Instant Delivery",
      answer:
        "Payment complete hote hi screen par turant (0 seconds) direct high-speed Download button popup hoga. Sath hi aapki registered Email ID par bhi instant backup download link bhej diya jata hai jisse aap kabhi bhi files access kar sakte hain.",
    },
    {
      question: "Kya main ise apne Mobile (Android / iPhone) me read/use kar sakta hu?",
      tag: "100% Compatible",
      answer:
        "Haan, bilkul! Saari files universal PDF aur uncompressed master format me hain. Aap inhe kisi bhi Android phone, iPhone, iPad, Windows laptop ya Mac par bina kisi pareshani ke 1-click me open aur print kar sakte hain.",
    },
    {
      question: "Agar mera phone badal gaya ya link delete ho gaya to kya hoga?",
      tag: "Lifetime Access",
      answer:
        "Aapko Lifetime Access milta hai. Aap apni order confirmation email se kabhi bhi dubara download kar sakte hain, ya hamare WhatsApp support (+91-8595403030) par order number bhej kar turant naya link le sakte hain.",
    },
    {
      question: `Kya is package me saare chapters aur content complete hain?`,
      tag: "Verified Syllabus",
      answer: `Haan, ${product.name} ek 100% complete package hai. Isme saare syllabus aur modules chapter-wise systematically arranged hain jisse aapka time bache aur aap bina kisi confusion ke directly padh/seekh sakein.`,
    },
    {
      question: "Kya UPI (GPay, PhonePe, Paytm) se payment safe hai?",
      tag: "100% Safe Checkout",
      answer:
        "100% safe aur secure hai. Hamara checkout 256-Bit SSL Encryption dwara protected hai. Aap safely apne kisi bhi UPI app (Google Pay, PhonePe, Paytm, BHIM) ya Debit/Credit Cards se pay kar sakte hain. Koi hidden charge nahi hai.",
    },
    {
      question: "Agar mujhe koi dikkat aati hai to customer support kaise milega?",
      tag: "WhatsApp Help",
      answer:
        "Hamari dedicated WhatsApp support team hamesha ready hai. Aap direct +91-8595403030 par WhatsApp message bhej sakte hain ya help@selfnotes99.com par email kar sakte hain. Hum usually 5 se 15 minute me reply karte hain.",
    },
  ];

  return (
    <section aria-label="Frequently Asked Questions" className={`mb-12 sm:mb-16 ${className}`}>
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 p-4 sm:p-7 lg:p-9 shadow-xs">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4D5] text-[#064B35] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#78B82A]" />
            <span>Got Doubts? We Have Answers</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
            Everything you need to know before buying <span className="font-bold text-gray-800">{product.name}</span>.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl sm:rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? "bg-[#FAFDF8] border-[#78B82A]/70 shadow-2xs"
                    : "bg-white border-gray-200/80 hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        isOpen ? "bg-[#064B35] text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {faq.tag && (
                      <span className="hidden sm:inline-block text-[10px] font-bold text-[#064B35] bg-[#EAF4D5] px-2 py-0.5 rounded-md">
                        {faq.tag}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#064B35]" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 text-xs sm:text-[13px] text-gray-600 leading-relaxed border-t border-gray-100/80 mt-1 pl-11">
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Contact Strip */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Still have an unanswered question?</span>
          <a
            href="https://wa.me/918595403030?text=Hi%20selfnotes99,%20I%20have%20a%20question%20before%20ordering."
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold text-[#064B35] hover:text-[#78B82A] underline flex items-center gap-1"
          >
            <span>Ask us directly on WhatsApp (+91-8595403030)</span>
            &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
