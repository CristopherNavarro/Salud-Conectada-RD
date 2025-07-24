import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// AÑADIDO: Import del componente Script de Next.js
import Script from "next/script";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Salud Conectada RD",
  description: "Optimizando la gestión de citas médicas y la red de voluntarios en centros de salud comunitarios.",
};

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", ptSans.variable)}>
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        
        {/* AÑADIDO: Script para integrar el Web Chat en toda la página */}
        <Script
          src="https://kirki.app.n8n.cloud/webhook/ea4c87e7-61f7-4266-937f-3f6c3047c2f3/chat"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}