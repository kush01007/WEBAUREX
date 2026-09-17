import { homepage, projects, services, processSteps, faqs } from "@/data/homepage-v2";
import { testimonials } from "@/data/homepageData";
import Navigation from "./navigation/Navigation";
import Hero from "./hero/Hero";
import StudioIntro from "./studio/StudioIntro";
import SelectedWork from "./work/SelectedWork";
import Services from "./services/Services";
import SignatureScene from "./signature/SignatureScene";
import Process from "./process/Process";
import ClientStories from "./stories/ClientStories";
import Faq from "./faq/Faq";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";
import theme from "./tokens.module.css";
import styles from "./HomepageV2.module.css";

export default function HomepageV2() {
  return (
    <div className={`homepage-v2 ${theme.theme} ${styles.page}`} data-homepage="v2">
      <a className={styles.skip} href="#v2-main">Skip to content</a>
      <Navigation navigation={homepage.navigation} enquiry={homepage.enquiry} />
      <main id="v2-main" tabIndex={-1}>
        <Hero content={homepage.hero} />
        <StudioIntro content={homepage.intro} />
        <SelectedWork content={homepage.work} projects={projects} enquiry={homepage.enquiry} />
        <Services content={homepage.services} services={services} enquiry={homepage.enquiry} />
        <SignatureScene content={homepage.signature} />
        <Process content={homepage.process} steps={processSteps} />
        <ClientStories stories={testimonials} />
        <Faq questions={faqs} email={homepage.email} />
        <Contact content={homepage.contact} email={homepage.email} services={services} poster={homepage.hero.poster} />
      </main>
      <Footer email={homepage.email} />
    </div>
  );
}
