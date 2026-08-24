// Eigenes Layout, damit die Maintenance-Seite kein Site-Chrome erbt.
export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
