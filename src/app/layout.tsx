import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavegationBar } from "../components/layout/NavegationBar";
import { Playfair_Display } from "next/font/google";
import { AppNextAuthProvider } from "../providers/app-next-auth-provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightFlow",
  description: "Tu espacio de trabajo colaborativo",
};

export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-montserrat antialiased bg-background text-foreground">
        <AppNextAuthProvider>
          <NavegationBar />
          <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
            <main className="pt-24 pb-8 flex-1">{children}</main>
          </div>
        </AppNextAuthProvider>
      </body>
    </html>
  );
}
