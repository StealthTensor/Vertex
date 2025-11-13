import type { MetadataRoute } from "next";
export const runtime = "edge";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vertex.system",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://vertex.system/Landing/BigScreen.png"],
    },
    {
      url: "https://vertex.system/auth/login",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://vertex.system/Landing/BigScreenLogin.png"],
    },
  ];
}
