import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import PlanGrid from "@/components/PlanGrid";
import FeatureGrid from "@/components/FeatureGrid";
import IncludedFeature from "@/components/IncludedFeature";
import Faq from "@/components/Faq";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import {
  emailMeta, emailHero, emailPlans, emailFeatures, emailDomain, emailMigration, emailSecurity, emailFaq, emailCta,
} from "@/lib/content";

export const metadata: Metadata = {
  title: emailMeta.title,
  description: emailMeta.description,
};

export default function BusinessEmailPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={emailHero.heading} sub={emailHero.sub} />
        <PlanGrid eyebrow={emailPlans.eyebrow} heading={emailPlans.heading} plans={emailPlans.items} anchorId="plans" />
        <FeatureGrid heading={emailFeatures.heading} sub={emailFeatures.sub} items={emailFeatures.items} />
        <IncludedFeature eyebrow="Domains" heading={emailDomain.heading} body={emailDomain.body} />
        <IncludedFeature eyebrow="Migration" heading={emailMigration.heading} body={emailMigration.body} />
        <IncludedFeature eyebrow="Security" heading={emailSecurity.heading} body={emailSecurity.body} />
        <Faq heading={emailFaq.heading} items={emailFaq.items} />
        <CtaBandSimple heading={emailCta.heading} cta={emailCta.cta} />
      </main>
      <Footer />
    </>
  );
}
