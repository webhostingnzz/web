import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import VpsConfigurator from "@/components/VpsConfigurator";
import VpsManagement from "@/components/VpsManagement";
import VpsAdvancedFeatures from "@/components/VpsAdvancedFeatures";
import IncludedFeature from "@/components/IncludedFeature";
import Faq from "@/components/Faq";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { vpsMeta, vpsHero, vpsIncluded, vpsFaq, vpsCta } from "@/lib/content";

export const metadata: Metadata = {
  title: vpsMeta.title,
  description: vpsMeta.description,
};

export default function VpsHostingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={vpsHero.heading} sub={vpsHero.sub} />
        <VpsConfigurator />
        <VpsManagement />
        <VpsAdvancedFeatures />
        <IncludedFeature eyebrow={vpsIncluded.eyebrow} heading={vpsIncluded.heading} body={vpsIncluded.body} />
        <Faq heading={vpsFaq.heading} items={vpsFaq.items} />
        <CtaBandSimple heading={vpsCta.heading} cta={vpsCta.cta} />
      </main>
      <Footer />
    </>
  );
}
