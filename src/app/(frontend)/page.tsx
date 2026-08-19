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

const homeFaqs = [
  {
    q: "Was unterscheidet PB Fahrzeugpflege von anderen Aufbereitern im Saarland?",
    a: 'PB Fahrzeugpflege Saarlouis arbeitet inhabergeführt seit 1997 ausschließlich an privaten Kundenfahrzeugen und ist auf Sportwagen, Oldtimer und Luxusfahrzeuge spezialisiert. Statt schneller Massenabfertigung nehmen wir uns die Zeit für ein perfektes Ergebnis – nach dem Motto „Wir schützen Werte". Über 600 positive Bewertungen und eine Weiterempfehlungsrate von über 95 % bestätigen das.',
  },
  {
    q: "Bieten Sie auch Aufbereitung für Sportwagen, Oldtimer und Luxusfahrzeuge an?",
    a: "Ja. Hochwertige Fahrzeuge sind unsere Spezialität – vom High-End-Lackschutz per Keramikversiegelung bis zur kompletten Innen- und Außenaufbereitung.",
  },
  {
    q: "Seit wann gibt es PB Fahrzeugpflege?",
    a: "PB Fahrzeugpflege Saarlouis besteht seit 1997 und gehört mit über 29 Jahren Erfahrung zu den ältesten und erfahrensten Fahrzeugaufbereitern Deutschlands.",
  },
  {
    q: "Aus welchen Regionen kommen Ihre Kunden?",
    a: "Unsere Kunden kommen aus Saarlouis und dem gesamten Saarland, aus Luxemburg sowie aus den angrenzenden Regionen. Unser Standort in Ensdorf an der B51 liegt verkehrsgünstig mit unmittelbarer Zuganbindung.",
  },
  {
    q: "Wo befindet sich PB Fahrzeugpflege?",
    a: "Sie finden uns in der Provinzialstraße 243, 66806 Ensdorf – direkt bei Saarlouis. Begutachtung und Angebot sind auch ohne Termin möglich.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Fahrzeugaufbereitung Saarlouis & Keramikversiegelung",
  },
  description:
    "Premium-Fahrzeugaufbereitung & Keramikversiegelung im Saarland und Luxemburg – seit 1997. Spezialist für Neuwagen, Sportwagen & Luxusfahrzeuge. Über 648 Top-Bewertungen.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const webPage = webPageSchema({
    path: "/",
    name: "Fahrzeugaufbereitung Saarlouis & Keramikversiegelung",
    description:
      "Premium-Fahrzeugaufbereitung & Keramikversiegelung im Saarland und Luxemburg – seit 1997.",
    breadcrumb: breadcrumbList([{ name: "Home", path: "/" }]),
  });
  return (
    <>
      <JsonLd data={[webPage, productAggregateRating, faqPageSchema(homeFaqs)]} />
      <ScrollTopOnLoad />
      <main className="relative">
        <Hero />
        <Anspruch />
        <Services />
        <Vehicles />
        <Process />
        <WhyUs />
        <Awards />
        <Region />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
