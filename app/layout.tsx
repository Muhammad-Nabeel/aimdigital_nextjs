import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/config/site";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AIM Digital | AI Software, E-commerce & Digital Marketing",
    template: "%s | AIM Digital",
  },
  description:
    "AI-powered websites, bespoke software, e-commerce and digital marketing from AIM DIGITAL UK LTD. Tell us what your business needs next.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <SiteShell header={<Header />} footer={<Footer />}>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
