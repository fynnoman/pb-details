import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: Request) {
  const draft = await draftMode();
  draft.disable();
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";
  return NextResponse.redirect(new URL(path, req.url));
}
