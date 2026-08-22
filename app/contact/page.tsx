import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { contactMeta, contactHero } from "@/lib/content";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={contactHero.heading} sub={contactHero.sub} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
