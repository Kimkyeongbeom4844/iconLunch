import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "아콘점심요정",
    short_name: "아콘점심요정",
    description: "(주)아이디어콘서트의 회사사람들을 위한 요정",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCFC",
    theme_color: "#000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icons/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/icons/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icons/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
