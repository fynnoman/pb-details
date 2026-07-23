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
