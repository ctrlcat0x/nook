import { LandingNavbar } from "./_components/navbar";
import {
  LandingHero,
  LandingFeatures,
  LandingTestimonials,
  LandingPricing,
  LandingFAQ,
} from "./_components/heading";
import { LandingFooter } from "./_components/footer";

const LandingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1f1f1f]">
      <LandingNavbar />
      <main className="flex-1 flex flex-col justify-center items-center w-full">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingPricing />
        <LandingFAQ />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
