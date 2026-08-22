import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import CtaBandSimple from "@/components/CtaBandSimple";
import Footer from "@/components/Footer";
import { blogMeta, blogHero } from "@/lib/content";

export const metadata: Metadata = {
  title: blogMeta.title,
  description: blogMeta.description,
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero heading={blogHero.heading} sub={blogHero.sub} />
        <BlogList />
        <CtaBandSimple heading="Build your website with Webhosting NZ" cta={{ label: "Get started", href: "/web-hosting/" }} />
      </main>
      <Footer />
    </>
  );
}
