import type { TextOptions } from "../models/TextOptions";

const LOREM =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

const WORDS = LOREM.split(" ");

/**
 * Utility to generate random words from the lorem dictionary.
 */
function randomWords(count: number): string {
  return Array.from({ length: count }, () =>
    WORDS[Math.floor(Math.random() * WORDS.length)]
  ).join(" ");
}

/**
 * Main text generator based on TextOptions.
 */
export function generateText(options: TextOptions): string {
  const { textChecked, textType, textCount = 0 } = options;

  if (!textChecked || textCount <= 0) {
    return "";
  }

  switch (textType) {
    case "words":
      return randomWords(textCount);

    case "paragraph":
      return Array.from({ length: textCount }, () =>
        randomWords(40) // ~40 words per paragraph
      ).join("\n\n");

    case "letters":
      return LOREM.repeat(Math.ceil(textCount / LOREM.length)).slice(
        0,
        textCount
      );

    default:
      return "";
  }
}
