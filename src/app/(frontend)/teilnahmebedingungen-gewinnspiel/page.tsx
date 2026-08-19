import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/teilnahmebedingungen-gewinnspiel/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Teilnahmebedingungen Gewinnspiel | PB Fahrzeugpflege");

export default function TeilnahmePage() {
  return <CmsPage path={PATH} />;
}
