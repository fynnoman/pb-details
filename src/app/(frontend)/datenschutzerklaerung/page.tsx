import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/datenschutzerklaerung/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Datenschutzerklärung | PB Fahrzeugpflege Saarlouis");

export default function DatenschutzPage() {
  return <CmsPage path={PATH} />;
}
