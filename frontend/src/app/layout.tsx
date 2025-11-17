import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
// import { TallyModalRoot } from "./TallyModalRoot";
import SwRegister from "./components/sw-register";
import { AuthStateWatcher } from "./components/AuthStateWatcher";
// REMOVE THIS:
// import { Toaster } from "sonner";

// ADD THIS:
import { ToasterClientComponent } from "./toaster"; // <-- ADD THIS

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

const description =
  "VERTEX - Sharp. Digital. Uncompromising.";
export const metadata: Metadata = {
  title: "VERTEX",
  description,
  authors: [{ name: "StealthTensor" }],
  keywords: ["VERTEX",  "ACADEMIC"],
  openGraph: {
    title: "VERTEX",
    description,
    url: "https://vertex.system",
    siteName: "VERTEX",
    images: [
      {
        url: "/vertex-og.png",
        width: 1200,
        height: 630,
        alt: "Vertex Academic Management",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vertex_system",
    title: "VERTEX",
    description,
    creator: "@vertex_system",
    images: [
      {
        url: "/vertex-og.png",
        width: 1200,
        height: 630,
        alt: "Vertex Academic Management",
        type: "image/png",
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
        <link rel="manifest" href="/site.webmanifest?v=3" />
        <meta name="theme-color" content="#16171b" />
      </head>
      <body
        className={`${geistMono.variable} ${spaceGrotesk.variable} antialiased overflow-hidden`}
        style={{
          background: 'var(--vertex-black)',
          color: 'var(--vertex-white)',
          fontFamily: 'var(--font-inter)'
        }}
      >
        {/* <TallyModalRoot /> */}

        <SwRegister />
        <AuthStateWatcher />
        {/* REPLACE THIS: */}
        {/* <Toaster position="top-right" richColors /> */}
        
        {/* WITH THIS: */}
        <ToasterClientComponent /> 
        
        {children}
      </body>
    </html>
  );
}