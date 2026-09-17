import "./homepage.css";
import StudioHero from "@/components/hero/StudioHero";
import StudioNavbar from "@/components/hero/StudioNavbar";
import HomepageSections from "@/components/sections/HomepageSections";

export default function Home() {
  return (
    <>
      <StudioNavbar />
      <main id="main" tabIndex={-1}>
        <StudioHero />
        <HomepageSections />
      </main>
    </>
  );
}
