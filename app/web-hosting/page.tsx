import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import LogoMarquee from "@/components/LogoMarquee";
import WebHostingPlans from "@/components/WebHostingPlans";
import ComparisonTable from "@/components/ComparisonTable";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import OneClickApps from "@/components/OneClickApps";
import Faq from "@/components/Faq";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { webHostingMeta, webHostingHero, webHostingFaq, webHostingCta } from "@/lib/content";

export const metadata: Metadata = {
  title: webHostingMeta.title,
  description: webHostingMeta.description,
};

export default function WebHostingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={webHostingHero.heading} sub={webHostingHero.sub} />
        <WebHostingPlans />
        <ComparisonTable />
        <AdvancedFeatures />
        <OneClickApps />
        <Faq heading={webHostingFaq.heading} items={webHostingFaq.items} />
        <CtaBandSimple heading={webHostingCta.heading} cta={webHostingCta.cta} />
        <LogoMarquee />
      </main>
      <Footer />
    </>
  );
}
