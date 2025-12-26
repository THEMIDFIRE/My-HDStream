import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Nav from "./_components/shared/Navigation/Nav";
import "./globals.css";
import { QueryProvider } from "./providers/provider";


const manrope = Manrope({ subsets: ["latin"], display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  title: "My HDStream | Free Movies & TV Shows Online",
  description: "Stream thousands of free HD movies and TV shows online with My HDStream. Enjoy unlimited entertainment, no subscriptions required.",
  keywords: "streaming, movies, TV shows, free, HD, entertainment, online",
  authors: [{ name: "Mohamed Magdy | chaoticoder" }],
  creator: "Mohamed Magdy | chaoticoder",
  publisher: "Mohamed Magdy | chaoticoder",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-hd-stream.vercel.app/",
    title: "My HDStream | Free Movies & TV Shows Online",
    description: "Stream thousands of free HD movies and TV shows online with My HDStream. Enjoy unlimited entertainment, no subscriptions required.",
    siteName: "My HDStream",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased dark`}>
        <QueryProvider>
          <Nav />
          <main>
            {children}
            {/* <CTA /> */}
          </main>
          {/* <Footer /> */}
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}