
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";


export const metadata = {
  title: "NotesIn - Handwritten Notes, AI Tools & Resume Builder",
  description:
    "NotesIn is your all-in-one student platform with handwritten notes, study materials, coding labs, AI-powered tools, quizzes, and an ATS-friendly resume builder to boost both learning and career growth.",
  keywords:
    "notesin, handwritten notes, college notes, university notes, study materials, code labs, online resume builder, AI tools for students, quizzes, text summarizer, quiz generator, flashcard generator, study plan generator, concept explainer, coder helper, ATS resume builder, education platform",
  authors: [
    { name: "Gopal Verma", url: "https://www.notesin.com" },
    { name: "NotesIn", url: "https://www.notesin.com" },
  ],
  metadataBase: new URL("https://www.notesin.com"),

  icons: {
    icon: [{ url: "/notesinlogo2.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/notesinlogo2.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    url: "https://www.notesin.com",
    title: "NotesIn - Handwritten Notes, AI Tools & Resume Builder",
    description:
      "NotesIn is your all-in-one student platform with handwritten notes, study materials, coding labs, AI-powered tools, quizzes, and an ATS-friendly resume builder to boost both learning and career growth.",
    siteName: "NotesIn",
    images: [
      {
        url: "/notesinlogo2.png",
        width: 512,
        height: 512,
        alt: "NotesIn Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NotesIn - Handwritten Notes, AI Tools & Resume Builder",
    description:
      "NotesIn is your all-in-one student platform with handwritten notes, study materials, coding labs, AI-powered tools, quizzes, and an ATS-friendly resume builder to boost both learning and career growth.",
    images: ["/notesinlogo2.png"],
  },
};

// ✅ Fix: viewport must be separate export
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
  <html lang="en">


      <head>
        {/* ✅ Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z51QGDG3CP"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z51QGDG3CP', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
     <body>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
