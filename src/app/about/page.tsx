import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "30,000+", label: "Happy Customers", sub: "Worldwide community" },
    { value: "500+", label: "Curated Products", sub: "Designed for longevity" },
    { value: "24/7", label: "Concierge Support", sub: "Always here for you" },
    { value: "98%", label: "Satisfaction Rate", sub: "Verified 5-star reviews" },
  ];

  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#064B35]" />,
      title: "Uncompromising Quality",
      desc: "Every textile, buckle, and stitch is tested for real-world resilience. We partner exclusively with master craftspeople.",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#064B35]" />,
      title: "Mindful Sustainability",
      desc: "Over 85% organic natural fibers, recycled post-consumer packaging, and carbon-neutral transit partners.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#064B35]" />,
      title: "Honest Direct Pricing",
      desc: "By eliminating middleman distributor markups, we deliver authentic luxury craftsmanship at genuine everyday prices.",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <div className="bg-[#FBF6EE] rounded-3xl p-8 sm:p-14 border border-[#F0E8DC] text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          Our Philosophy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#064B35] mt-4 mb-4 tracking-tight">
          Style Better. Live Better.
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Founded on the conviction that everyday objects should inspire tranquility and delight, ShopifyRetail curates elevated lifestyle essentials built to withstand the test of time.
        </p>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#EDE4D5] text-center"
          >
            <p className="text-3xl sm:text-4xl font-extrabold text-[#064B35] tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
              {stat.label}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Story & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-[#78B82A] uppercase tracking-wider">
            Our Origin Story
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight leading-snug">
            Crafting a Calm Counterbalance to Throwaway Culture
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            In an era driven by fast trends and disposable consumerism, we set out to build an intentional alternative. We began with a single question: what if every item in your life was crafted with such enduring honesty that you never wished to replace it?
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Today, our Portland-based studio works in direct collaboration with heritage tanneries in Tuscany, certified organic cotton mills in Portugal, and family-owned ceramic studios in Kyoto.
          </p>
          <div className="pt-2">
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#064B35] hover:underline"
            >
              <span>Explore our Sustainability Commitments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
            alt="Artisans crafting goods in workshop"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="bg-[#EAF4D5] rounded-3xl p-8 sm:p-12 border border-[#D5E6B8]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="text-2xl font-extrabold text-[#064B35]">
            Why Discerning Shoppers Choose Us
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Built on transparency, timeless aesthetics, and relentless attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-xs border border-white/60 space-y-2.5"
            >
              <div className="p-2.5 bg-[#F3F8E8] rounded-xl w-fit">
                {pillar.icon}
              </div>
              <h4 className="text-sm font-bold text-[#111111]">{pillar.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
