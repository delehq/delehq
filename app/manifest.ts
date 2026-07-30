import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayodele John — Software Engineer",
    short_name: "Ayodele John",
    description:
      "Ayodele John is a software engineer building production-grade platforms end-to-end, from backend systems to the interfaces that ship them.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f3",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
