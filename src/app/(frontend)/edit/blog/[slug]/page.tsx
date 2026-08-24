import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getEditUser } from "@/lib/edit-auth";
import { getPayloadClient } from "@/lib/payload-client";
import { EditProvider } from "@/components/edit/EditProvider";
import EditToolbar from "@/components/edit/EditToolbar";
import EditModeSetup from "@/components/edit/EditModeSetup";
import EditBlogSimple from "@/components/edit/EditBlogSimple";

export const metadata: Metadata = {
  title: { absolute: "Blogbeitrag bearbeiten · PB Fahrzeugpflege" },
  robots: { index: false, follow: false },
};

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getEditUser();
  if (!user) redirect("/admin/login?redirect=/edit");

  const { slug } = await params;
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });
  const post = res.docs[0] as any;
  if (!post) notFound();

  return (
    <EditProvider>
      <EditModeSetup />
      <EditToolbar userName={(user as any).email ?? (user as any).name} />
      <EditBlogSimple post={post} />
    </EditProvider>
  );
}
