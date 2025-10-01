import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { BookDemoDialogProvider } from "@/components/site/book-demo-dialog-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmLink | Digital Coffee Management System",
  description:
    "FarmLink keeps coffee exporters on top of farmer data, deliveries, payments, mapping, inventory, and compliance-online or offline.",
  metadataBase: new URL("https://farmlink.et"),
  openGraph: {
    title: "FarmLink | Digital Coffee Management System",
    description:
      "FarmLink keeps coffee exporters on top of farmer data, deliveries, payments, mapping, inventory, and compliance-online or offline.",
    url: "https://farmlink.et",
    siteName: "FarmLink",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FarmLink | Digital Coffee Management System",
    description:
      "Offline-first SaaS platform connecting farmer profiles, weigh-ins, payouts, mapping, inventory, and compliance for coffee exporters.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-background/90 text-foreground antialiased`}
      >
        <BookDemoDialogProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-b from-[#e6f3ff] via-transparent to-[#e0f2d6]" />
            <div className="pointer-events-none absolute inset-0 -z-40 bg-[radial-gradient(circle_at_top,_rgba(17,130,198,0.18),_transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 -z-50 bg-[radial-gradient(circle_at_bottom_right,_rgba(129,183,87,0.18),_transparent_60%)]" />
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </BookDemoDialogProvider>
      </body>
    </html>
  );
}
