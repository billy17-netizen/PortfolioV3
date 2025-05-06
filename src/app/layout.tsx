import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Anton, Archivo_Black, Lexend_Mega, Public_Sans } from "next/font/google";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import TouchDeviceDetector from "@/components/TouchDeviceDetector";

// Bebas Neue for main headings
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap"
});

// Anton for bold titles
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap"
});

// Archivo Black for strong statements
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap"
});

// Lexend Mega for body text
const lexendMega = Lexend_Mega({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-lexend-mega",
  display: "swap"
});

// Public Sans for various uses
const publicSans = Public_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Neo Brutalist Portfolio | Fullstack Developer",
  description: "Portfolio showcasing fullstack web development skills with a neo-brutalist design approach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
      ${bebasNeue.variable} 
      ${anton.variable} 
      ${archivoBlack.variable} 
      ${lexendMega.variable} 
      ${publicSans.variable}
    `}>
      <body className="font-sans antialiased">
        <TouchDeviceDetector />
        <SmoothScroller>
        {children}
        </SmoothScroller>
        <CustomCursor />
      </body>
    </html>
  );
}
