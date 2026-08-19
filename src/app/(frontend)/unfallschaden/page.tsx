import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/unfallschaden/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Unfallschaden-Abwicklung – PB Fahrzeugpflege Saarlouis");

export default function UnfallschadenPage() {
  return (
    <CmsPage
      path={PATH}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "Unfallschaden", path: PATH },
      ]}
    />
  );
}
