import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/danke/";

export const generateMetadata = () => pageMetadata(PATH, "Danke – Ihre Nachricht ist eingegangen");

export default function DankePage() {
  return <CmsPage path={PATH} />;
}
