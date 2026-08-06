/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

export const POST = GRAPHQL_POST(config);
