import React from "react";

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#064B35" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 13L2 9Z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </svg>
      ),
      title: "Premium Quality",
      description: "Handpicked products for you",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#064B35" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="2" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
          <path d="M2 8h3" />
          <path d="M1 11h2" />
        </svg>
      ),
      title: "Fast & Free Shipping",
      description: "On orders Rs 50+",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#064B35" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a9 9 0 0 1 18 0v12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        </svg>
      ),
      title: "24/7 Support",
      description: "We're here to help",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#064B35" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Secure Payment",
      description: "100% Protected",
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Light Green Rounded Container matching screenshot */}
      <div className="bg-[#EAF4D5] rounded-2xl p-4 sm:p-6 lg:p-7 border border-[#D8E8BF]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#C8DCAB]">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${
                idx === 0
                  ? "lg:pr-6"
                  : idx === benefits.length - 1
                  ? "lg:pl-6"
                  : "lg:px-6"
              }`}
            >
              <div className="shrink-0 p-2 rounded-xl bg-white/40">{benefit.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-[#111111] leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#555555] font-medium">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
