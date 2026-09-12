import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://toppercanvas.com'),
  title: "INDIA'S No. 1 Practical SQL Notes 2026 | Master Databases, Queries & JOINs",
  description: "Master SQL from zero with 16 practical core units, hand-drawn schema diagrams, Venn diagrams for JOINs, constraints, query execution order, and solved interview questions at just ₹99.",
  keywords: [
    "SQL Notes 2026",
    "Learn SQL from Scratch",
    "SQL Joins Explained",
    "SQL Ebook PDF Download",
    "DBMS & SQL Study Material",
    "BCA BTech SQL Notes",
    "SQL Interview Preparation",
    "SQL Mastery 2026"
  ],
  authors: [{ name: "SQL Mastery" }],
  openGraph: {
    title: "Practical SQL Notes 2026 | Master Databases & Queries",
    description: "Master SQL fundamentals, table relationships, and JOINs with 16 illustrated units at ₹99.",
    url: "https://sqlmastery.in",
    siteName: "SQL Mastery",
    images: [
      {
        url: "/assets/sql/02_sql_sublanguages.png",
        width: 800,
        height: 600,
        alt: "SQL Made Simple 2026 Complete Ebook"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical SQL Notes 2026 | Master Databases & Queries",
    description: "Complete 16-Unit Practical SQL Study Kit with Hand-Drawn Notes & Diagrams at ₹99.",
    images: ["/assets/sql/02_sql_sublanguages.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "SQL Made Simple 2026 – The Practical Beginner's Guide",
    "image": "/assets/sql/02_sql_sublanguages.png",
    "description": "Complete 16-Unit Practical SQL Study Kit including smart visual notes, ER diagrams, JOIN Venn diagrams, constraints, and solved queries.",
    "brand": {
      "@type": "Brand",
      "name": "SQL Mastery"
    },
    "offers": {
      "@type": "Offer",
      "price": "99",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://superprofile.bio/vp/master-sql-from-zero-—-learn-to-write-real-sql-queries-with-confidence"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2400"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen flex flex-col font-sans bg-[#EBAF87] text-[#1F1714]"
      >
        {children}
      </body>
    </html>
  );
}
