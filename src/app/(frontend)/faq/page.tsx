import { pageMetadata } from "@/components/CmsPage";
import { getPayloadClient } from "@/lib/payload-client";
import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, faqPageSchema, webPageSchema } from "@/lib/schema";
import { loadPageByPath } from "@/lib/site-data";

const PATH = "/faq/";

export const generateMetadata = () =>
  pageMetadata(PATH, "FAQ – Häufige Fragen | PB Fahrzeugpflege Saarlouis");

export default async function FaqPage() {
  const [page, payload] = await Promise.all([
    loadPageByPath(PATH),
    getPayloadClient(),
  ]);
  const faqRes = await payload.find({
    collection: "faqs",
    sort: "topic",
    depth: 0,
    limit: 200,
  });
  const faqs = (faqRes.docs as any[]).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const webPage = webPageSchema({
    path: PATH,
    name: page?.metaTitle || "FAQ – Häufige Fragen",
    description: page?.metaDescription,
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "FAQ", path: PATH },
    ]),
  });

  return (
    <main className="relative">
      <JsonLd data={[webPage, faqPageSchema(faqs)]} />
      <PageHero
        kicker={page?.sections?.[0]?.kicker || "FAQ"}
        title={page?.sections?.[0]?.title || "Antworten auf das, was Sie wissen wollen."}
      />
      <FAQ faqs={faqs} showAllLink={false} />
    </main>
  );
}
