import { Geist, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "Webaurex Studio — Websites That Feel Like Brands",
  description: "Independent web design and development. Webaurex Studio builds thoughtful, distinctive websites that feel like brands.",
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
