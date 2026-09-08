import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Recycle, HeartHandshake, Target, ArrowRight } from "lucide-react";

export default function SustainabilityPage() {
  const commitments = [
    {
      icon: <Leaf className="w-6 h-6 text-[#064B35]" />,
      title: "Better Materials",
      desc: "We exclusively select certified GOTS organic cotton, OEKO-TEX Standard 100 linen, and LWG Gold-rated vegetable-tanned leather to minimize water pollution and microplastic shedding.",
    },
    {
      icon: <Recycle className="w-6 h-6 text-[#064B35]" />,
      title: "Responsible Packaging",
      desc: "Every package sent to your door is 100% plastic-free, made from post-consumer recycled corrugated cardboard and sealed with water-activated kraft tape printed with natural soy-based inks.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#064B35]" />,
      title: "Ethical Craftsmanship",
      desc: "We partner strictly with certified fair-wage workshops where master artisans are protected by stringent health, safety, and living-wage standards.",
    },
    {
      icon: <Target className="w-6 h-6 text-[#064B35]" />,
      title: "Carbon-Neutral Delivery",
      desc: "Through audited reforestation and clean renewable grid investments, we offset 100% of carbon emissions generated across our fulfillment routes.",
    },
  ];

  const goals = [
    { year: "2025", goal: "100% Recycled & Organic Fiber Integration across all apparel lines." },
    { year: "2026", goal: "Zero-waste fulfillment certification for all regional distribution hubs." },
    { year: "2028", goal: "Closed-loop garment recycling program allowing customers to return old items for store credit." },
    { year: "2030", goal: "Net-zero greenhouse gas emissions across all supply chain tiers." },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="bg-[#EAF4D5] rounded-3xl p-8 sm:p-14 border border-[#D5E6B8] text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-white px-3.5 py-1 rounded-full shadow-xs">
          Our Ecological Promise
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#064B35] mt-4 mb-4 tracking-tight">
          Mindful Living for Generations Ahead
        </h1>
        <p className="text-xs sm:text-base text-[#444444] max-w-2xl mx-auto leading-relaxed">
          True luxury is respectful of the earth. We design and craft with circularity in mind, ensuring our products enhance your daily life without depleting natural ecosystems.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commitments.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#EDE4D5] space-y-3"
          >
            <div className="p-3 bg-[#EAF4D5] rounded-xl w-fit">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-[#111111]">{item.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Visual Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
            alt="Sustainable botanical forestry"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78B82A]">
            Traceable Accountability
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            Our Roadmap Toward Net-Zero By 2030
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Sustainability cannot be a buzzword. We publish annual third-party audits examining our Scope 1, 2, and 3 emissions, material lifecycles, and factory partner certifications.
          </p>

          {/* Goals list */}
          <div className="space-y-3 pt-2">
            {goals.map((g, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <span className="font-extrabold text-[#064B35] bg-[#EAF4D5] px-2.5 py-1 rounded-md shrink-0">
                  {g.year}
                </span>
                <p className="text-gray-700 leading-normal pt-0.5">{g.goal}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#064B35] text-white text-xs font-bold rounded-xl hover:bg-[#0B6B47] transition-all"
            >
              <span>Shop Sustainable Staples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
