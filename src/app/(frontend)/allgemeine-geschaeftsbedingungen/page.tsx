import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/allgemeine-geschaeftsbedingungen/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Allgemeine Geschäftsbedingungen | PB Fahrzeugpflege Saarlouis");

export default function AgbPage() {
  return <CmsPage path={PATH} />;
}
