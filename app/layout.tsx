import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Trend Traffic Hunter",
  description: "The AI That Finds Trends For Your Offer Before You Even Know What To Post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
