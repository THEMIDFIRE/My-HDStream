import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Nav from "./_components/shared/Nav";
import Footer from "./_components/shared/Footer";
import CTA from "./_components/shared/CTA";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My HDStream | Free Movies & TV Shows Online",
  description: "My HDStream is a free streaming platform that provides access to a vast library of movies and TV shows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased dark`}>
        <Nav />
        <main>
          {children}
        </main>
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
