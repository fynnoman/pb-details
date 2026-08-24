import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getEditUser } from "@/lib/edit-auth";
import { getPayloadClient } from "@/lib/payload-client";
import { EditProvider } from "@/components/edit/EditProvider";
import EditToolbar from "@/components/edit/EditToolbar";
import EditModeSetup from "@/components/edit/EditModeSetup";
import EditServiceSimple from "@/components/edit/EditServiceSimple";

export const metadata: Metadata = {
  title: { absolute: "Leistung bearbeiten · PB Fahrzeugpflege" },
  robots: { index: false, follow: false },
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getEditUser();
  if (!user) redirect("/admin/login?redirect=/edit");

  const { slug } = await params;
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });
  const service = res.docs[0] as any;
  if (!service) notFound();

  return (
    <EditProvider>
      <EditModeSetup />
      <EditToolbar userName={(user as any).email ?? (user as any).name} />
      <EditServiceSimple service={service} />
    </EditProvider>
  );
}
