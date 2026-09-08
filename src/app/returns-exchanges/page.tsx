import React from "react";
import Link from "next/link";
import { RotateCcw, PackageCheck, Printer, CreditCard } from "lucide-react";

export default function ReturnsExchangesPage() {
  const steps = [
    {
      icon: <PackageCheck className="w-6 h-6 text-[#064B35]" />,
      step: "Step 1",
      title: "Initiate Your Return",
      desc: "Enter your Order ID and zip code in our portal to select the items you wish to return or exchange.",
    },
    {
      icon: <Printer className="w-6 h-6 text-[#064B35]" />,
      step: "Step 2",
      title: "Print Prepaid Label",
      desc: "Download and print your complimentary prepaid USPS/UPS return shipping label instantly.",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#064B35]" />,
      step: "Step 3",
      title: "Pack & Drop Off",
      desc: "Place unworn items in their original packaging and drop off the carton at any carrier location.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#064B35]" />,
      step: "Step 4",
      title: "Refund Processed",
      desc: "Once received and inspected, your full refund is credited back to your original payment method in 3–5 days.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          Hassle-Free Returns
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          30-Day Easy Returns &amp; Exchanges
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          We want you to love everything you order. If not, return it with zero stress.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#EDE4D5] flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 bg-[#EAF4D5] rounded-xl w-fit mb-3">
                {s.icon}
              </div>
              <span className="text-[10px] font-extrabold uppercase text-[#78B82A] tracking-wider">
                {s.step}
              </span>
              <h3 className="font-bold text-sm text-gray-900 mt-1 mb-1">
                {s.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Policies */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 text-xs sm:text-sm text-gray-700 space-y-6 leading-relaxed">
        <div>
          <h2 className="text-base font-bold text-[#111111] mb-2">
            Return Guidelines &amp; Condition
          </h2>
          <p>
            To receive a full refund, all merchandise must be returned within 30 days of receipt in unworn, unwashed, and undamaged condition, accompanied by all original designer tags, dust bags, and packaging intact.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#111111] mb-2">
            Exchanges For Sizing
          </h2>
          <p>
            Need a different size or alternative colorway? Size exchanges are 100% free with priority replacement shipping dispatched immediately upon package carrier scan.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-sm text-gray-900">Need Help with an Order?</p>
            <p className="text-xs text-gray-500">Our customer care team is available 24/7.</p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-[#064B35] text-white text-xs font-bold rounded-xl hover:bg-[#0B6B47] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
