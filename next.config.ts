import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // pdf-parse ships a pdf.js worker file that must resolve at runtime;
  // keep it (and pdf.js itself, pre-imported by the parse route) external
  // so the worker path stays intact when bundled.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
