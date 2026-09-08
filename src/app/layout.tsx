import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { DigitalSocialProofToast } from "@/components/products/DigitalSocialProofToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Self Notes 99 — Style Better. Live Better.",
  description:
    "Discover premium products, handpicked for your lifestyle. Enjoy Free Shipping on orders $50+, 30-day easy returns, and 24/7 customer support.",
  openGraph: {
    title: "Self Notes 99 — Style Better. Live Better.",
    description:
      "Your one-stop destination for quality lifestyle goods, fashion, footwear, and curated home essentials.",
    siteName: "Self Notes 99",
  },
};

import { ProductProvider } from "@/context/ProductContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-[#111111] bg-white flex flex-col min-h-screen selection:bg-[#EAF4D5] selection:text-[#064B35]">
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              {/* Top Announcement Bar */}
              <AnnouncementBar />

              {/* Main Sticky Header */}
              <Header />

              {/* Main Content Area */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Floating Toast Notification */}
              <ToastNotification />

              {/* Global Recent Buyer Social Proof Notification (20% Larger, All Pages) */}
              <DigitalSocialProofToast />
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
