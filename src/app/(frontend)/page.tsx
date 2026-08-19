import type { Metadata } from "next";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import Hero from "@/components/Hero";
import Anspruch from "@/components/Anspruch";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Awards from "@/components/Awards";
import Region from "@/components/Region";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbList,
  faqPageSchema,
  productAggregateRating,
  webPageSchema,
} from "@/lib/schema";
import {
  loadAwards,
  loadFaqsByTopic,
  loadHomeGlobal,
  loadServicesForHome,
  loadSettings,
  loadVehicles,
} from "@/lib/site-data";

export async function generateMetadata(): Promise<Metadata> {
  const home = await loadHomeGlobal();
  return {
    title: {
      absolute:
        home.metaTitle || "Fahrzeugaufbereitung Saarlouis & Keramikversiegelung",
    },
    description:
      home.metaDescription ||
      "Premium-Fahrzeugaufbereitung & Keramikversiegelung im Saarland und Luxemburg – seit 1997.",
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [home, settings, services, vehicles, awards, faqs] = await Promise.all([
    loadHomeGlobal(),
    loadSettings(),
    loadServicesForHome(),
    loadVehicles(),
    loadAwards(),
    loadFaqsByTopic("home"),
  ]);

  const homeFaqs = faqs.map((f) => ({ question: f.question, answer: f.answer }));
  const webPage = webPageSchema({
    path: "/",
    name: home.metaTitle || home.title,
    description: home.metaDescription || home.subtitle,
    breadcrumb: breadcrumbList([{ name: "Home", path: "/" }]),
  });

  return (
    <>
      <JsonLd
        data={[
          webPage,
          productAggregateRating,
          faqPageSchema(homeFaqs),
        ]}
      />
      <ScrollTopOnLoad />
      <main className="relative">
        <Hero home={home} settings={settings} />
        <Anspruch settings={settings} />
        <Services services={services} />
        <Vehicles vehicles={vehicles} />
        <Process
          kicker={home.processKicker}
          heading={home.processHeading}
          steps={home.processSteps}
          footnote={home.processFootnote}
        />
        <WhyUs
          heading={home.whyUsHeading}
          bullets={home.whyUsBullets}
          mottoLabel={home.mottoLabel}
          mottoText={home.mottoText}
          settings={settings}
        />
        <Awards awards={awards} />
        <Region home={home} settings={settings} />
        <FAQ faqs={homeFaqs} />
        <Contact settings={settings} />
      </main>
    </>
  );
}
