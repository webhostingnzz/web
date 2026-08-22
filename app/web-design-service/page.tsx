import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/ProcessSteps";
import PlanGrid from "@/components/PlanGrid";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { designMeta, designHero, designProcess, designPlans, designCta } from "@/lib/content";

export const metadata: Metadata = {
  title: designMeta.title,
  description: designMeta.description,
};

export default function WebDesignServicePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={designHero.heading} sub={designHero.sub} />
        <ProcessSteps heading={designProcess.heading} steps={designProcess.steps} />
        <PlanGrid eyebrow={designPlans.eyebrow} heading={designPlans.heading} plans={designPlans.items} anchorId="pricing" priceSuffix="NZD" />
        <CtaBandSimple heading={designCta.heading} cta={designCta.cta} />
      </main>
      <Footer />
    </>
  );
}
