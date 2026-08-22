import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import Plans from "@/components/Plans";
import Solutions from "@/components/Solutions";
import MigrationBanner from "@/components/MigrationBanner";
import Performance from "@/components/Performance";
import Security from "@/components/Security";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <WhyChooseUs />
        <Plans />
        <Solutions />
        <MigrationBanner />
        <Performance />
        <Security />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
