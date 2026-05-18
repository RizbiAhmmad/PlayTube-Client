import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/Queryprovider";
import { Toaster } from "@/components/ui/sonner";

import FloatingChatbot from "@/components/modules/Chatbot/FloatingChatbot";

import { ThemeProvider } from "@/providers/ThemeProvider";
import SmoothScroll from "@/components/shared/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayTube",
  description: "A PlayTube client built with Next.js and TypeScript.",
  icons: {
    icon: "/Playtube_icon.png",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <FloatingChatbot />
            <Toaster richColors position="top-right" />
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
