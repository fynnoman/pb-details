import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/allgemeine-geschaeftsbedingungen/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Allgemeine Geschäftsbedingungen | PB Fahrzeugpflege Saarlouis");

export default function AgbPage() {
  return (
    <>
      <div className="relative border-b border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-10 py-3 sm:py-4 text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
          <span className="font-semibold text-[var(--gold)] tracking-[0.16em] uppercase text-[10px] sm:text-[11px] mr-2">
            Hinweis
          </span>
          Diese Allgemeinen Geschäftsbedingungen werden derzeit überarbeitet
          und rechtlich geprüft. Für verbindliche Auskünfte bitten wir Sie,
          sich direkt an uns zu wenden.
        </div>
      </div>
      <CmsPage path={PATH} />
    </>
  );
}
