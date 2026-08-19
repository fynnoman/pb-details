import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/impressum/";

export const generateMetadata = () => pageMetadata(PATH, "Impressum | PB Fahrzeugpflege Saarlouis");

export default function ImpressumPage() {
  return <CmsPage path={PATH} />;
}
