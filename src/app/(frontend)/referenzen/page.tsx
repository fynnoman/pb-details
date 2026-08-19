import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/referenzen/";

export const generateMetadata = () =>
  pageMetadata(PATH, "Referenzen & Auszeichnungen | PB Fahrzeugpflege Saarlouis");

export default function ReferenzenPage() {
  return (
    <CmsPage
      path={PATH}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "Referenzen", path: PATH },
      ]}
    />
  );
}
