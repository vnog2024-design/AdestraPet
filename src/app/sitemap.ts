import type { MetadataRoute } from "next";
import { PRODUCT } from "@/config/product";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = PRODUCT.siteUrl;
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
