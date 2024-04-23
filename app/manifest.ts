import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alpha-ka App",
    short_name: "Alphaka",
    description: "알파카 - 건축을 위한 모든 것",
    start_url: "./",
    display: "standalone",
    background_color: "#4169E1",
    theme_color: "#4169E1",
    icons: [
      {
        src: "/icons/192-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    scope: "./",
    orientation: "portrait",
  };
}
