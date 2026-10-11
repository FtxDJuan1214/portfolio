/**
 * Contenido personal de la página /sobre-mi.
 * Edita aquí los textos: el resto de la página se arma sola.
 */

import type { Locale } from "./content";

type Localized<T> = Record<Locale, T>;

export type AboutMeInterest = {
  id: string;
  /** Nombre de un icono de lucide-react (ver `ICONS` en about-me-view.tsx). */
  icon: "camera" | "map" | "music" | "book" | "code" | "coffee" | "mountain" | "gamepad";
  label: Localized<string>;
};

export const aboutMe: {
  intro: Localized<string>;
  paragraphs: Localized<string[]>;
  interests: AboutMeInterest[];
} = {
  intro: {
    es: "Más allá del código, estas son las cosas que me mueven.",
    en: "Beyond code, these are the things that move me.",
  },
  /** TODO: reemplaza estos párrafos por tu texto. */
  paragraphs: {
    es: [
      "Escribe aquí el primer párrafo: quién eres fuera del trabajo, qué te apasiona y qué te mantiene curioso.",
      "Segundo párrafo: tus aficiones, lo que haces en tu tiempo libre, la música que escuchas, los libros que lees.",
      "Tercer párrafo: por qué viajas, qué buscas en cada lugar y qué te llevas de vuelta.",
    ],
    en: [
      "Write the first paragraph here: who you are outside of work, what you're passionate about and what keeps you curious.",
      "Second paragraph: your hobbies, what you do in your free time, the music you listen to, the books you read.",
      "Third paragraph: why you travel, what you look for in every place and what you bring back.",
    ],
  },
  /** TODO: ajusta, quita o añade intereses. */
  interests: [
    { id: "travel", icon: "map", label: { es: "Viajar", en: "Travelling" } },
    { id: "photo", icon: "camera", label: { es: "Fotografía", en: "Photography" } },
    { id: "music", icon: "music", label: { es: "Música", en: "Music" } },
    { id: "reading", icon: "book", label: { es: "Lectura", en: "Reading" } },
    { id: "side-projects", icon: "code", label: { es: "Side projects", en: "Side projects" } },
    { id: "coffee", icon: "coffee", label: { es: "Café", en: "Coffee" } },
  ],
};
