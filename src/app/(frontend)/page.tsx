import type { Metadata } from "next";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import Hero from "@/components/Hero";
import Anspruch from "@/components/Anspruch";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import Awards from "@/components/Awards";
import Region from "@/components/Region";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import SousLaSurface from "@/components/SousLaSurface";
import Divider from "@/components/motion/Divider";
import {
  breadcrumbList,
  buildProductAggregateRating,
  faqPageSchema,
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
  const { draftMode } = await import("next/headers");
  const { isEnabled: draft } = await draftMode();
  const [home, settings, services, vehicles, awards, faqs] = await Promise.all([
    loadHomeGlobal({ draft }),
    loadSettings(),
    loadServicesForHome(),
    loadVehicles(),
    loadAwards(),
    loadFaqsByTopic("home"),
  ]);

  const homeFaqs = faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }));
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
          buildProductAggregateRating(settings),
          faqPageSchema(homeFaqs),
        ]}
      />
      <ScrollTopOnLoad />
      <main className="relative">
        <Hero home={home} settings={settings} />
        <Anspruch settings={settings} home={home} />
        <SousLaSurface />
        <Divider variant="diamond" />
        <Services services={services} home={home} />
        <Vehicles vehicles={vehicles} home={home} />
        <Divider variant="diamond" />
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
        <Reviews settings={settings} />
        <Awards awards={awards} home={home} />
        <Divider variant="diamond" />
        <Region home={home} settings={settings} />
        <FAQ faqs={homeFaqs} home={home} />
        <Contact settings={settings} home={home} />
      </main>
    </>
  );
}
