import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TECHTONIC'25",
    short_name: "TECHTONIC",
    description: "The ultimate arcade & retro video game themed technical fest",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#7829ff",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
