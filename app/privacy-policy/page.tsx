import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/components/LegalDocument";
import Footer from "@/components/Footer";
import { privacyMeta, privacySections } from "@/lib/content";

export const metadata: Metadata = {
  title: privacyMeta.title,
  description: privacyMeta.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading="Privacy policy" sub="How we collect, use, store, and protect your personal data under the New Zealand Privacy Act 2020." />
        <LegalDocument sections={privacySections} />
      </main>
      <Footer />
    </>
  );
}
