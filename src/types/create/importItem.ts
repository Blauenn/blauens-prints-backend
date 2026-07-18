import type { ExifData } from "../exif/exifData";

export type ImportItem = {
  id: string;
  file: File;
  exif?: ExifData;
  keywords?: string[];
  status: "pending" | "readingExif" | "ready" | "error";
};
