/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck  (Payload-eigene CSS-Importe haben keine Typen)
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import "@payloadcms/next/css";
import "@/payload/admin.css";
import { importMap } from "./admin/importMap";
import type { ServerFunctionClient } from "payload";
import React from "react";

/**
 * Payload-Layout: rendert das komplette HTML-Dokument für /admin und /api.
 * Kein Site-Chrome (Nav/Footer/JSON-LD) - Payload liefert seine eigene UI.
 */

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
