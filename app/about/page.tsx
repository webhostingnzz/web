import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import IncludedFeature from "@/components/IncludedFeature";
import FeatureGrid from "@/components/FeatureGrid";
import Milestones from "@/components/Milestones";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { aboutMeta, aboutHero, aboutWelcome, aboutDifferent, aboutMilestones } from "@/lib/content";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={aboutHero.heading} sub={aboutHero.sub} />
        <IncludedFeature eyebrow="Welcome" heading={aboutWelcome.heading} body={aboutWelcome.body} />
        <FeatureGrid heading={aboutDifferent.heading} sub={aboutDifferent.sub} items={aboutDifferent.items} columns={3} />
        <Milestones heading={aboutMilestones.heading} items={aboutMilestones.items} />
        <CtaBandSimple heading="Build your website with Webhosting NZ" cta={{ label: "Get started", href: "/web-hosting/" }} />
      </main>
      <Footer />
    </>
  );
}
