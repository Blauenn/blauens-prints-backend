export type ExifData = {
  originalFileName: string | null;

  width: number | null;
  height: number | null;

  cameraName: string | null;
  cameraModel: string | null;
  lensModel: string | null;

  focalLength: number | null;
  focalLengthMax: number | null;

  iso: number | null;
  exposureTime: number | null;
  aperture: number | null;

  flash: boolean | null;

  createdAt: Date | null;

  keywords: string[];
};
