import type { Metadata } from "next";
import { Graduate, Montserrat, Space_Mono } from "next/font/google";
import "./globals.css";

const graduate = Graduate({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graduate",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WC26 — Winter Cup 2026",
  description:
    "Winter Cup 2026 on kuuden kuukauden simulaattorigolf-turnaus. Kaksi joukkuetta, kuusi kenttää, yksi mestari.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body
        className={`${graduate.variable} ${montserrat.variable} ${spaceMono.variable}`}
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
