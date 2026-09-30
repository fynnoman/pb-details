import CmsPage, { pageMetadata } from "@/components/CmsPage";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import LegalSectionRenderer from "@/components/LegalSectionRenderer";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { loadLegalPages } from "@/lib/site-data";

const PATH = "/allgemeine-geschaeftsbedingungen/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Allgemeine Geschäftsbedingungen | PB Fahrzeugpflege Saarlouis");

export default async function AgbPage() {
  const legal = await loadLegalPages();
  const cmsSections = legal?.agb?.sections || [];
  const hasCmsSections = cmsSections.some(
    (s) => (s.heading && s.heading.trim()) || (s.body && s.body.trim()),
  );

  if (!hasCmsSections) {
    return <CmsPage path={PATH} />;
  }

  const webPage = webPageSchema({
    path: PATH,
    name: "Allgemeine Geschäftsbedingungen | PB Fahrzeugpflege Saarlouis",
    description:
      "Allgemeine Geschäftsbedingungen von PB Fahrzeugpflege Saarlouis.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Allgemeine Geschäftsbedingungen", path: PATH },
    ]),
  });

  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero kicker="Rechtliches" title="Allgemeine Geschäftsbedingungen" />
      <section className="relative py-12 sm:py-24">
        <div className="mx-auto max-w-[820px] px-4 sm:px-8 lg:px-10 text-sm sm:text-base text-[var(--ink-dim)] leading-relaxed break-words">
          <LegalSectionRenderer sections={cmsSections} />
        </div>
      </section>
    </main>
  );
}
