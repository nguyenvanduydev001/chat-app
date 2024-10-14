import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chat App",
  description: "Realtime chat app using",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
