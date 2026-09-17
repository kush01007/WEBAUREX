import AboutSection from "./AboutSection";
import ShowcaseSection from "./ShowcaseSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import JournalSection from "./JournalSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";

export default function HomepageSections() {
  return (
    <div className="homepage-sections overflow-x-clip bg-[#f5f5f2] font-[family-name:var(--font-geist)] text-[#111] [color-scheme:light] selection:bg-black selection:text-white">
      <AboutSection />
      <ShowcaseSection />
      <ServicesSection />
      <TestimonialsSection />
      <JournalSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
