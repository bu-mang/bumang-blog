import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * used for CLASS MERGE and CLASS OVERRIDE
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
