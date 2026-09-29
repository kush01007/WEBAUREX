import { Geist, Manrope } from "next/font/google";
import "./globals.css";
import webaurexLogo from "./webauerexlogo.png";
import {
  GOOGLE_SITE_VERIFICATION,
  HOME_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [{ url: webaurexLogo.src, sizes: "512x512", type: "image/png" }],
    shortcut: [{ url: webaurexLogo.src, type: "image/png" }],
    apple: [{ url: webaurexLogo.src, sizes: "512x512", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geist.variable} antialiased`}
    >
      <body>
        {children}
        <noscript>
          <style>{`[style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; } .scene-drift { animation: none !important; } .motion-toggle, .scene-curtains { display: none; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
