import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Support | SQL Mastery',
  description: 'Need help with your SQL notes order, download link, or have questions? Contact our dedicated support team via WhatsApp or email.',
  alternates: {
    canonical: 'https://selfnotes99.github.io/contact',
  },
  openGraph: {
    title: 'Contact & Support | SQL Mastery',
    description: 'Get instant support for your SQL study materials, orders, and downloads.',
    url: 'https://selfnotes99.github.io/contact',
    siteName: 'SQL Mastery',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact & Support | SQL Mastery',
    description: 'Get instant support for your SQL study materials, orders, and downloads.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
