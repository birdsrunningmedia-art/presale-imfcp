import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IMFC - AI Image Delivery for African Creatives",
  description:
    "Image for Creatives (IMFC) offers culturally authentic, high-fidelity AI-generated images built for African creators. Access world-class imagery without barriers or high-cost subscriptions.",
  keywords: [
    "AI image delivery",
    "African creators images",
    "authentic visuals",
    "creative assets",
    "high-fidelity AI imagery",
    "cultural imagery",
  ],
  openGraph: {
    type: "website",
    title: "IMFC - AI Image Delivery for African Creatives",
    description:
      "Image for Creatives (IMFC) provides high-fidelity, culturally authentic AI-generated images for African creators. No subscriptions, just creative freedom.",
    url: "https://presale.imageforcreatives.com",
    siteName: "IMFC",
  },
  robots: {
    index: true, // allow indexing
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Optional: Canonical for SEO */}
        <link rel="canonical" href="https://presale.imageforcreatives.com" />
        {/* Favicon placeholder */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-brand-black text-brand-white`}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
