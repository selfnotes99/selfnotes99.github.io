import { JobPosition } from "@/types";

export const jobPositions: JobPosition[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Next.js Engineer",
    department: "Engineering",
    location: "Remote (US / Europe)",
    type: "Full-time",
    experience: "5+ years",
    description: "Architect high-performance e-commerce shopping experiences using Next.js App Router, TypeScript, GraphQL, and modern edge infrastructure.",
    responsibilities: [
      "Drive architecture for headless commerce storefront and microservices",
      "Optimize web vital metrics (LCP < 1.2s, CLS < 0.05)",
      "Collaborate with UX designers to implement fluid micro-interactions with Framer Motion",
    ],
    requirements: [
      "5+ years of production experience with modern React & TypeScript",
      "Demonstrated experience with Next.js App Router and server components",
      "Strong understanding of web performance, caching strategies, and accessibility (WCAG 2.1)",
    ],
  },
  {
    id: "job-2",
    title: "Principal UI/UX Product Designer",
    department: "Design",
    location: "New York, NY / Hybrid",
    type: "Full-time",
    experience: "6+ years",
    description: "Lead the design language system across web, mobile, and physical packaging for our next-generation retail products.",
    responsibilities: [
      "Craft high-fidelity prototypes and design systems in Figma",
      "Conduct user research and usability testing to elevate conversion rates",
      "Partner with engineering to ensure pixel-perfect design implementation",
    ],
    requirements: [
      "Outstanding portfolio showcasing luxury or lifestyle direct-to-consumer e-commerce",
      "Expertise in motion design, typography hierarchy, and micro-interactions",
      "Deep understanding of design token systems and design handoffs",
    ],
  },
  {
    id: "job-3",
    title: "Supply Chain & Sustainability Specialist",
    department: "Operations",
    location: "Portland, OR / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    description: "Ensure ethical sourcing, circular packaging lifecycles, and sustainable carbon-neutral logistics across international suppliers.",
    responsibilities: [
      "Audit tier-1 and tier-2 textile and leather suppliers for environmental compliance",
      "Identify recyclable and compostable alternatives for retail packaging",
      "Coordinate carbon offset programs with logistics partners",
    ],
    requirements: [
      "B.S. in Environmental Science, Supply Chain Management, or equivalent",
      "Experience with GOTS, OEKO-TEX, and Leather Working Group certifications",
      "Analytical mindset with strong vendor negotiation skills",
    ],
  },
  {
    id: "job-4",
    title: "Customer Experience Concierge Lead",
    department: "Customer Support",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description: "Provide empathetic, delightful 24/7 client care across live chat, email, and phone for discerning retail clients.",
    responsibilities: [
      "Handle VIP inquiries, styling recommendations, and order tracking",
      "Manage returns and warranty exchanges with zero-friction client empathy",
      "Synthesize client feedback into actionable insights for product teams",
    ],
    requirements: [
      "Passionate about luxury customer service and thoughtful hospitality",
      "Superb written and verbal English communication",
      "Familiarity with modern CRM and e-commerce platforms",
    ],
  },
];
