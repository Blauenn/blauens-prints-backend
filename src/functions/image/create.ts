import type { ImportItem } from "#/types/create/importItem";
import type { ExifData } from "#/types/exif/exifData";
import exifr from "exifr";
import type { Dispatch, SetStateAction } from "react";
import { stringSplit } from "../string/stringSplit";
import { stripEnhanced } from "../string/filenameStrip";

export function importFiles(files: File[]): ImportItem[] {
  return files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    status: "pending",
  }));
}

export function exifParse(file: File) {
  return exifr.parse(file);
}

export async function hydrateExif(
  item: ImportItem,
  setItems: Dispatch<SetStateAction<ImportItem[]>>,
) {
  // Set as reading
  setItems((prev) =>
    prev.map((i) => (i.id === item.id ? { ...i, status: "readingExif" } : i)),
  );

  try {
    const parsed = await exifParse(item.file);

    const [, originalFileName, dimensions] = stringSplit(
      stripEnhanced(item.file.name),
      "-",
    );
    const dimensionsNoSuffix = stringSplit(dimensions, ".")[0];
    const [width, height] = stringSplit(dimensionsNoSuffix, " x ").map(Number);

    const keywords = Array.isArray(parsed?.Keywords)
      ? parsed.Keywords
      : parsed?.keywords
        ? [parsed?.Keywords]
        : [];

    const exif: ExifData = {
      originalFileName: originalFileName ?? null,

      width: width,
      height: height,

      cameraName: parsed?.Make ?? null,
      cameraModel: parsed?.Model ?? null,
      lensModel: parsed?.LensModel ?? null,

      focalLength: parsed?.FocalLength ?? null,
      focalLengthMax: parsed?.MaxFocalLength ?? null,

      iso: parsed?.ISO ?? null,
      exposureTime: parsed?.ExposureTime ?? null,
      aperture: parsed?.FNumber ?? null,

      flash: parsed?.Flash ?? null,

      keywords: keywords,

      createdAt: parsed?.DateTimeOriginal ?? null,
    };

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "ready", exif } : i)),
    );
  } catch {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "error" } : i)),
    );
  }
}
