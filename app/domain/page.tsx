import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import TldPricing from "@/components/TldPricing";
import DomainGuide from "@/components/DomainGuide";
import DomainActions from "@/components/DomainActions";
import FeatureGrid from "@/components/FeatureGrid";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { domainMeta, domainHero, domainConfidence, domainWhyUs, domainFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: domainMeta.title,
  description: domainMeta.description,
};

export default function DomainPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={domainHero.heading} sub={domainHero.sub} />
        <TldPricing />
        <DomainGuide />
        <DomainActions />
        <FeatureGrid heading={domainConfidence.heading} sub={domainConfidence.sub} items={domainConfidence.items} />
        <FeatureGrid heading={domainWhyUs.heading} sub={domainWhyUs.sub} items={domainWhyUs.items} columns={3} />
        <Faq heading={domainFaq.heading} items={domainFaq.items} />
      </main>
      <Footer />
    </>
  );
}
