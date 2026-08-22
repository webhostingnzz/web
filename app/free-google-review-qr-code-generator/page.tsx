import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import QrGenerator from "@/components/QrGenerator";
import ProcessSteps from "@/components/ProcessSteps";
import FeatureGrid from "@/components/FeatureGrid";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { qrMeta, qrHero, qrSteps, qrWhy, qrFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: qrMeta.title,
  description: qrMeta.description,
};

export default function QrGeneratorPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={qrHero.heading} sub={qrHero.sub} />
        <QrGenerator />
        <ProcessSteps heading={qrSteps.heading} steps={qrSteps.items} />
        <FeatureGrid heading={qrWhy.heading} sub={qrWhy.sub} items={qrWhy.items} columns={4} />
        <Faq heading={qrFaq.heading} items={qrFaq.items} />
      </main>
      <Footer />
    </>
  );
}
