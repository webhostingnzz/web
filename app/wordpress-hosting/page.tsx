import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import PlanGrid from "@/components/PlanGrid";
import FeatureComparisonTable from "@/components/FeatureComparisonTable";
import FeatureGrid from "@/components/FeatureGrid";
import Faq from "@/components/Faq";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { wpMeta, wpHero, wpPlans, wpComparison, wpAdvanced, wpFaq, wpCta } from "@/lib/content";

export const metadata: Metadata = {
  title: wpMeta.title,
  description: wpMeta.description,
};

export default function WordPressHostingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={wpHero.heading} sub={wpHero.sub} />
        <PlanGrid eyebrow={wpPlans.eyebrow} heading={wpPlans.heading} sub={wpPlans.sub} plans={wpPlans.items} anchorId="hosting-plans" />
        <FeatureComparisonTable heading={wpComparison.heading} sub={wpComparison.sub} planNames={wpComparison.planNames} rows={wpComparison.rows} />
        <FeatureGrid heading={wpAdvanced.heading} sub={wpAdvanced.sub} items={wpAdvanced.items} />
        <Faq heading={wpFaq.heading} items={wpFaq.items} />
        <CtaBandSimple heading={wpCta.heading} cta={wpCta.cta} />
      </main>
      <Footer />
    </>
  );
}
