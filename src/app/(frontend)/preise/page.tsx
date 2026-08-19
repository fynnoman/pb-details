import CmsPage, { pageMetadata } from "@/components/CmsPage";

const PATH = "/preise/";

export const generateMetadata = () => pageMetadata(PATH, "Preise – PB Fahrzeugpflege Saarlouis");

export default function PreisePage() {
  return (
    <CmsPage
      path={PATH}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "Preise", path: PATH },
      ]}
    />
  );
}
