import type { Metadata } from "next";
import { Fraunces, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Luxe Screens — Private Theatres for Every Occasion",
  description:
    "Book a private theatre room for birthdays, anniversaries, dates, and small gatherings across Delhi, Mumbai, Bangalore, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(fraunces.variable, inter.variable, "font-sans", geist.variable)} suppressHydrationWarning={true}>
      <body className="antialiased h-screen overflow-y-scroll overflow-x-hidde">
        {children}
      </body>
    </html>
  );
}
