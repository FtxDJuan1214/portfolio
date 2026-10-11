"use client";

import { useEffect, useState } from "react";
import { navSections, type SectionId } from "@/config/site";

/** Devuelve el id de la sección que ocupa el centro del viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const sections = navSections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      const anchor = window.innerHeight * 0.35;
      let current: SectionId = "hero";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= anchor) {
          current = section.id as SectionId;
        }
      }
      setActive(current);
    };

    // Leer layout en cada evento de scroll fuerza un reflow síncrono por
    // evento; con rAF lo hacemos como mucho una vez por frame.
    let queued = 0;
    const schedule = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}
