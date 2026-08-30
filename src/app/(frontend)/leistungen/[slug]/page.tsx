import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import LexicalRenderer from "@/components/LexicalRenderer";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbList,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";

type Params = { slug: string };

type ServiceDoc = {
  id: string | number;
  slug: string;
  title: string;
  intro: string;
  tagline?: string;
  heroImage?: MediaDoc;
  content?: any;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MediaDoc;
  relatedFaqs?: Array<{
    id: string | number;
    question: string;
    answer: string;
  }>;
};

async function loadService(slug: string, draft = false): Promise<ServiceDoc | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft,
    overrideAccess: draft,
  });
  return (res.docs[0] as unknown as ServiceDoc) || null;
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "services",
    depth: 0,
    limit: 20,
  });
  return res.docs.map((d: any) => ({ slug: d.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await loadService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle || `${service.title} | PB Fahrzeugpflege Saarlouis` },
    description: service.metaDescription || service.intro,
    alternates: { canonical: `/leistungen/${service.slug}/` },
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.intro,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { draftMode } = await import("next/headers");
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const service = await loadService(slug, draft);
  if (!service) notFound();

  const path = `/leistungen/${service.slug}/`;
  const heroImg = mediaUrl(service.heroImage, "hero") || mediaUrl(service.heroImage);

  const webPage = webPageSchema({
    path,
    name: service.metaTitle || service.title,
    description: service.metaDescription || service.intro,
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Leistungen", path: "/leistungen/" },
      { name: service.title, path },
    ]),
  });

  const serviceLd = serviceSchema({
    name: service.title,
    description: service.intro,
    path,
    serviceType: service.title,
  });

  const faqs = (service.relatedFaqs || []).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <main className="relative">
      <JsonLd data={faqs.length ? [webPage, serviceLd, faqPageSchema(faqs)] : [webPage, serviceLd]} />
      <PageHero
        kicker={`Leistung · ${service.title}`}
        title={service.title}
        subtitle={service.tagline || service.intro}
        backgroundImage={heroImg}
      />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[820px] px-4 sm:px-8 lg:px-10">
          <LexicalRenderer data={service.content} />

          <Reveal delay={0.1}>
            <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/kontakt/#termin"
                className="btn-gold min-h-[48px] w-full sm:w-auto justify-center"
              >
                Termin buchen
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/preise/"
                className="btn-glass min-h-[48px] w-full sm:w-auto justify-center"
              >
                Preise ansehen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {faqs.length > 0 && (
        <FAQ
          id={`faq-${service.slug}`}
          kicker={`Häufige Fragen zu ${service.title}`}
          title={
            <>
              Antworten rund um Kosten, Haltbarkeit und{" "}
              <span className="italic text-gold">Ablauf.</span>
            </>
          }
          faqs={faqs}
        />
      )}

      <CtaSection
        title={
          <>
            Sprechen wir über Ihr <span className="italic text-gold">Fahrzeug.</span>
          </>
        }
        text="Kommen Sie ohne Termin vorbei oder rufen Sie kurz an. Nach einer Begutachtung erhalten Sie ein transparentes Festpreis-Angebot – ehrlich, ohne Überraschungen."
      />
    </main>
  );
}
