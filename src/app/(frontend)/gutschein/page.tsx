import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/gutschein/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Gutschein für Fahrzeugaufbereitung Saarlouis");

export default function GutscheinPage() {
  return <CmsPage path={PATH} />;
}
