import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute {
  return [
    {
      url: process.env.SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.SITE_URL}/result`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
