import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cinzel", display: "swap" });

export const metadata: Metadata = {
  title: `${wedding.bride.firstName} & ${wedding.groom.firstName} | Wedding Invitation`,
  description: `You are invited to celebrate the wedding of ${wedding.bride.fullName} and ${wedding.groom.fullName} on ${wedding.dateLong}.`,
};

export const viewport: Viewport = {
  themeColor: "#560a16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${cormorant.variable} ${cinzel.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
