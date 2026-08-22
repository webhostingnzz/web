import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import PlanGrid from "@/components/PlanGrid";
import FeatureGrid from "@/components/FeatureGrid";
import IncludedFeature from "@/components/IncludedFeature";
import Faq from "@/components/Faq";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { builderMeta, builderHero, builderPlans, builderAdvanced, builderIncluded, builderFaq, builderCta } from "@/lib/content";

export const metadata: Metadata = {
  title: builderMeta.title,
  description: builderMeta.description,
};

export default function WebsiteBuilderPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={builderHero.heading} sub={builderHero.sub} />
        <PlanGrid eyebrow={builderPlans.eyebrow} heading={builderPlans.heading} sub={builderPlans.sub} plans={builderPlans.items} anchorId="hosting-plans" />
        <FeatureGrid heading={builderAdvanced.heading} sub={builderAdvanced.sub} items={builderAdvanced.items} columns={4} />
        <IncludedFeature eyebrow={builderIncluded.eyebrow} heading={builderIncluded.heading} body={builderIncluded.body} />
        <Faq heading={builderFaq.heading} items={builderFaq.items} />
        <CtaBandSimple heading={builderCta.heading} cta={builderCta.cta} />
      </main>
      <Footer />
    </>
  );
}
