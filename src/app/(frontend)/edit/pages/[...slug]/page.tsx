import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getEditUser } from "@/lib/edit-auth";
import { getPayloadClient } from "@/lib/payload-client";
import { EditProvider } from "@/components/edit/EditProvider";
import EditToolbar from "@/components/edit/EditToolbar";
import EditModeSetup from "@/components/edit/EditModeSetup";
import EditPageSimple from "@/components/edit/EditPageSimple";

export const metadata: Metadata = {
  title: { absolute: "Bearbeiten · PB Fahrzeugpflege" },
  robots: { index: false, follow: false },
};

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const user = await getEditUser();
  if (!user) redirect("/admin/login?redirect=/edit");

  const { slug } = await params;
  const path = "/" + slug.join("/") + "/";

  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "pages",
    where: { path: { equals: path } },
    depth: 3,
    limit: 1,
  });
  const page = res.docs[0] as any;
  if (!page) notFound();

  return (
    <EditProvider>
      <EditModeSetup />
      <EditToolbar userName={(user as any).email ?? (user as any).name} />
      <EditPageSimple page={page} />
    </EditProvider>
  );
}
