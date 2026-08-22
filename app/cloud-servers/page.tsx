import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import CloudProviderTables from "@/components/CloudProviderTables";
import FeatureGrid from "@/components/FeatureGrid";
import BulletBand from "@/components/BulletBand";
import Faq from "@/components/Faq";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { cloudMeta, cloudHero, cloudAdvanced, cloudSuperCloud, cloudFaq, cloudCta } from "@/lib/content";

export const metadata: Metadata = {
  title: cloudMeta.title,
  description: cloudMeta.description,
};

export default function CloudServersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={cloudHero.heading} sub={cloudHero.sub} />
        <CloudProviderTables />
        <FeatureGrid heading={cloudAdvanced.heading} sub={cloudAdvanced.sub} items={cloudAdvanced.items} />
        <BulletBand heading={cloudSuperCloud.heading} items={cloudSuperCloud.items} />
        <Faq heading={cloudFaq.heading} items={cloudFaq.items} />
        <CtaBandSimple heading={cloudCta.heading} cta={cloudCta.cta} />
      </main>
      <Footer />
    </>
  );
}
