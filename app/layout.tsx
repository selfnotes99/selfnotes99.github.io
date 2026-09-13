import type { Metadata, Viewport } from 'next';
import './globals.css';
import MicrosoftClarity from '@/components/MicrosoftClarity';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#EBAF87',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://selfnotes99.github.io'),
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
    "SQL Mastery 2026",
    "SelfNotes SQL Ebook"
  ],
  authors: [{ name: "SQL Mastery" }],
  creator: "SQL Mastery",
  publisher: "SQL Mastery",
  alternates: {
    canonical: 'https://selfnotes99.github.io',
  },
  openGraph: {
    title: "Practical SQL Notes 2026 | Master Databases & Queries",
    description: "Master SQL fundamentals, table relationships, and JOINs with 16 illustrated units at ₹99.",
    url: "https://selfnotes99.github.io",
    siteName: "SQL Mastery",
    images: [
      {
        url: "https://selfnotes99.github.io/assets/sql/02_sql_sublanguages.webp",
        width: 800,
        height: 600,
        alt: "SQL Made Simple 2026 Complete Ebook - Visual Notes & Queries"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical SQL Notes 2026 | Master Databases & Queries",
    description: "Complete 16-Unit Practical SQL Study Kit with Hand-Drawn Notes & Diagrams at ₹99.",
    images: ["https://selfnotes99.github.io/assets/sql/02_sql_sublanguages.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/topper_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SQL Mastery",
      "url": "https://selfnotes99.github.io",
      "description": "Master SQL from zero with 16 practical core units, hand-drawn schema diagrams, and solved interview questions.",
      "inLanguage": "en-IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SQL Mastery",
      "url": "https://selfnotes99.github.io",
      "logo": "https://selfnotes99.github.io/assets/topper_logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "admin@toppercanvas.com",
        "telephone": "+91-9475465759",
        "availableLanguage": ["English", "Hindi"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "SQL Made Simple 2026 – The Practical Beginner's Guide",
      "image": "https://selfnotes99.github.io/assets/sql/02_sql_sublanguages.webp",
      "description": "Complete 16-Unit Practical SQL Study Kit including smart visual notes, ER diagrams, JOIN Venn diagrams, constraints, and solved queries.",
      "brand": {
        "@type": "Brand",
        "name": "SQL Mastery"
      },
      "offers": {
        "@type": "Offer",
        "price": "99",
        "priceCurrency": "INR",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://superprofile.bio/vp/master-sql-from-zero-—-learn-to-write-real-sql-queries-with-confidence",
        "seller": {
          "@type": "Organization",
          "name": "SQL Mastery"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2400",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this SQL note kit suitable for absolute beginners?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100%! We start from zero — explaining what a database is, why SQL exists, and how tables connect before introducing any complex syntax or multi-table queries."
          }
        },
        {
          "@type": "Question",
          "name": "What topics are covered in the 16 core units?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The ebook covers RDBMS Architecture, Data Types, Constraints (PK, FK, UNIQUE), Query Execution Order, DDL/DML/DAL, all Relational JOINs with Venn diagrams, Subqueries, and Security best practices."
          }
        },
        {
          "@type": "Question",
          "name": "How will I receive my notes after payment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Instant digital access! As soon as your ₹99 payment succeeds, you will be redirected to the download screen and receive direct high-resolution PDF download links via email and WhatsApp."
          }
        },
        {
          "@type": "Question",
          "name": "Can I read the notes on my phone or print them?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The PDF is fully optimized for Mobile, Tablet, and Desktop viewing, and is high-resolution for crystal-clear A4 printing."
          }
        },
        {
          "@type": "Question",
          "name": "Are there solved interview and exam questions included?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Each unit contains commonly asked technical interview questions, common mistakes to avoid, and query breakdown challenges with complete solutions."
          }
        }
      ]
    }
  ];

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Meta Pixel Code */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2280534892790197');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2280534892790197&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen flex flex-col font-sans bg-[#EBAF87] text-[#1F1714] overflow-x-hidden"
      >
        <MicrosoftClarity />
        {children}
      </body>
    </html>
  );
}
