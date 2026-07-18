import FileList from "#/components/image/FileList";
import { hydrateExif, importFiles } from "#/functions/image/create";
import { formatAperture } from "#/functions/numbers/aperture";
import { formatShutterSpeed } from "#/functions/numbers/exposureTime";
import type { ImportItem } from "#/types/create/importItem";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/image/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [items, setItems] = useState<ImportItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  var exif = selectedItem?.exif;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6">
      <Link to="/">
        <h1 className="text-lg font-bold text-blue-500 mb-4">« Return</h1>
      </Link>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (!e.target.files) return;

          const imported = importFiles(Array.from(e.target.files));

          setItems((prev) => [...prev, ...imported]);

          for (const item of imported) {
            hydrateExif(item, setItems);
          }

          if (selectedIndex === null && imported.length > 0) {
            setSelectedIndex(0);
          }

          e.target.value = "";
        }}
      />

      <div className="grid grid-cols-7 gap-4 h-[85vh]">
        <FileList
          items={items}
          setItems={setItems}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          inputRef={inputRef}
        />

        {exif ? (
          <div className="col-span-5 grid grid-cols-3 gap-4 w-full h-full px-4 py-2">
            {/* Image */}
            <div className="col-span-1 flex flex-col gap-4 justify-start">
              <img
                className="w-full rounded-xl"
                src={URL.createObjectURL(selectedItem?.file)}
              />
              <div className="flex flex-col">
                <h1 className="text-sm font-bold whitespace-normal break-all">
                  {exif.originalFileName}
                </h1>
                <h1 className="text-[10px] whitespace-normal break-all">
                  {exif.cameraName} {exif.cameraModel} + {exif.lensModel}
                </h1>
              </div>
              <div className="flex flex-row justify-between">
                {/* Labels */}
                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="text-[10px]">Resolution</h1>
                    <h1 className="text-[10px]">ISO</h1>
                    <h1 className="text-[10px]">Aperture</h1>
                    <h1 className="text-[10px]">Shutter</h1>
                    <h1 className="text-[10px]">Focal length</h1>
                  </div>
                </div>

                {/* Values */}
                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="text-[10px] font-bold text-right">
                      {exif.width}x{exif.height}
                    </h1>
                    <h1 className="text-[10px] font-bold text-right">
                      {exif.iso}
                    </h1>
                    <h1 className="text-[10px] font-bold text-right">
                      f/{formatAperture(Number(exif.aperture))}
                    </h1>
                    <h1 className="text-[10px] font-bold text-right">
                      {formatShutterSpeed(exif.exposureTime)}s
                    </h1>
                    <h1 className="text-[10px] font-bold text-right">
                      {exif.focalLength}mm
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="col-span-2 bg-red-300 border border-gray-200">
              <pre className="text-xs">{exif.width}</pre>
            </div>
          </div>
        ) : (
          <div className="col-span-5 flex items-center justify-center w-full h-full px-4 py-2">
            <h1 className="text-lg opacity-50">No image selected!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
