import type { MetadataRoute } from "next";
import { PRODUCT } from "@/config/product";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PRODUCT.siteUrl}/sitemap.xml`,
    host: PRODUCT.siteUrl,
  };
}
