import type { Metadata } from "next";
import { AboutMeView } from "@/components/about/about-me-view";

export const metadata: Metadata = {
  title: "About me",
  description:
    "What I do outside of code and a map with photos from the places I've visited.",
};

export default function AboutMePage() {
  return <AboutMeView />;
}
