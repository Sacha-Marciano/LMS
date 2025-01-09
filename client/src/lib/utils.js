// Simplifies the way tailwindcss classes are handled - used in shdcn ui components

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
