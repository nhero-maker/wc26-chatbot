import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Space_Mono } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WC26 \u2014 Winter Cup 2026",
  description:
    "Winter Cup 2026 on kuuden kuukauden simulaattorigolf-turnaus. Kaksi joukkuetta, kuusi kentt\u00e4\u00e4, yksi mestari.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} ${spaceMono.variable}`}
        style={{
          fontFamily: "var(--font-barlow), sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
