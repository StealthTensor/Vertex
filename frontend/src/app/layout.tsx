import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SwRegister from "./components/sw-register";
import { AuthStateWatcher } from "./components/AuthStateWatcher";
import { ToasterClientComponent } from "./toaster";
import { Analytics } from "@vercel/analytics/next"
import BottomNav from "./components/BottomNav";
import PagePadding from "./components/PagePadding";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description = "VERTEX SRM - The ultimate academic management tool for SRM students.";

export const metadata: Metadata = {
  title: {
    default: "VERTEX SRM",
    template: "%s | VERTEX SRM",
  },
  description,
  verification: {
    google: "lqZoy4RwbD94xx4x_rz8CjmuvarmsG32kB5obHt0kdc",
  },
  authors: [{ name: "StealthTensor" }],
  keywords: ["VERTEX SRM", "SRM Academia", "SRM University", "Vertex Student Portal", "Academic Management"],
  openGraph: {
    title: "VERTEX SRM",
    description,
    url: "https://vertex123.vercel.app",
    siteName: "VERTEX SRM",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://u.cubeupload.com/Trinai308/r8A6pD.png",
        width: 1200,
        height: 630,
        alt: "VERTEX SRM - Academic Management",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest?v=7" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body
        className={`${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-ordina), var(--font-space-grotesk), system-ui, sans-serif'
        }}
      >
        <SwRegister />
        <AuthStateWatcher />
        <ToasterClientComponent />
        <BottomNav />

        <main className="min-h-screen  relative z-10">
          <PagePadding>
            {children}
          </PagePadding>
        </main>

        <Analytics />
      </body>
    </html>
  );
}