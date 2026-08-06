import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import Hero from "@/components/Hero";
import Anspruch from "@/components/Anspruch";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Region from "@/components/Region";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Fahrzeugaufbereitung Saarlouis & Keramikversiegelung",
  },
  description:
    "Premium-Fahrzeugaufbereitung & Keramikversiegelung im Saarland und Luxemburg – seit 1997. Spezialist für Neuwagen, Sportwagen & Luxusfahrzeuge. Über 648 Top-Bewertungen.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollTopOnLoad />
      <Nav />
      <main className="relative">
        <Hero />
        <Anspruch />
        <Services />
        <Vehicles />
        <Process />
        <WhyUs />
        <Region />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
