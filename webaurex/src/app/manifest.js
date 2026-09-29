import webaurexLogo from "./webauerexlogo.png";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "Webaurex",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f2",
    theme_color: "#050505",
    icons: [
      {
        src: webaurexLogo.src,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
