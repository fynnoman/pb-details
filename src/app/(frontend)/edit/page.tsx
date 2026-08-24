import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getEditUser } from "@/lib/edit-auth";
import {
  loadAwards,
  loadFaqsByTopic,
  loadHomeGlobal,
  loadServicesForHome,
  loadSettings,
  loadVehicles,
} from "@/lib/site-data";
import { EditProvider } from "@/components/edit/EditProvider";
import EditToolbar from "@/components/edit/EditToolbar";
import EditModeSetup from "@/components/edit/EditModeSetup";
import EditHomeSimple from "@/components/edit/EditHomeSimple";

export const metadata: Metadata = {
  title: { absolute: "Bearbeiten · PB Fahrzeugpflege" },
  robots: { index: false, follow: false },
};

export default async function EditHomePage() {
  const user = await getEditUser();
  if (!user) redirect("/admin/login?redirect=/edit");

  const [home, settings, services, vehicles, awards, faqs] = await Promise.all([
    loadHomeGlobal(),
    loadSettings(),
    loadServicesForHome(),
    loadVehicles(),
    loadAwards(),
    loadFaqsByTopic("home"),
  ]);

  return (
    <EditProvider>
      <EditModeSetup />
      <EditToolbar userName={(user as any).email ?? (user as any).name} />
      <EditHomeSimple
        home={home}
        settings={settings}
        services={services}
        vehicles={vehicles}
        awards={awards}
        faqs={faqs}
      />
    </EditProvider>
  );
}
