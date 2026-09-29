import "./homepage.css";
import StudioHero from "@/components/hero/StudioHero";
import StudioNavbar from "@/components/hero/StudioNavbar";
import HomepageSections from "@/components/sections/HomepageSections";
import webaurexLogo from "./webauerexlogo.png";
import {
  HOME_TITLE,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

export const metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: webaurexLogo.src,
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: webaurexLogo.src, alt: `${SITE_NAME} logo` }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(webaurexLogo.src),
        width: 512,
        height: 512,
      },
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <StudioNavbar />
      <main id="main" tabIndex={-1}>
        <StudioHero />
        <HomepageSections />
      </main>
    </>
  );
}
