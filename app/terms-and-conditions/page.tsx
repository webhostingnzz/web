import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/components/LegalDocument";
import Footer from "@/components/Footer";
import { termsMeta, termsSections, termsUpdated } from "@/lib/content";

export const metadata: Metadata = {
  title: termsMeta.title,
  description: termsMeta.description,
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading="Terms and conditions" sub="Please read these terms carefully before using our services." />
        <LegalDocument intro={termsUpdated} sections={termsSections} />
      </main>
      <Footer />
    </>
  );
}
