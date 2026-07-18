const enhancedSuffixes = ["Enhanced-NR", "Verbessert-NR", "Amélioré-NR"];

export function stripEnhanced(text: string): string {
  for (const suffix of enhancedSuffixes) {
    if (text.includes(`-${suffix}`)) {
      return text.replace(`-${suffix}`, "");
    }
  }

  return text;
}
