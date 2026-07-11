import type { ImportItem } from "#/types/create/importItem";

export function importFiles(files: File[]): ImportItem[] {
  return files.map((file) => ({
    file,
  }));
}
