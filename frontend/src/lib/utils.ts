import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addPointsToStats(words: number, mins: number) {
  if (typeof window === "undefined") return;
  const currentWords = parseInt(localStorage.getItem("wordsLearnt") || "12");
  const currentMins = parseInt(localStorage.getItem("speakingMin") || "5");
  
  localStorage.setItem("wordsLearnt", (currentWords + words).toString());
  localStorage.setItem("speakingMin", (currentMins + mins).toString());
}
