import { importFiles } from "#/functions/image/create";
import type { ImportItem } from "#/types/create/importItem";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/image/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [items, setItems] = useState<ImportItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6">
      <Link to="/">
        <h1 className="text-lg font-bold text-blue-500 mb-4">« Return</h1>
      </Link>

      <div className="grid grid-cols-7 gap-4 h-[80vh]">
        {/* Dropzone */}
        <div className="col-span-2 w-full h-full p-3 bg-gray-200 rounded-xl">
          {items.length < 1 ? (
            <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
              <h1 className="text-xs text-center opacity-50">
                Drag and drop files to get started...
              </h1>

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

                  if (selectedIndex === null && imported.length > 0) {
                    setSelectedIndex(0);
                  }

                  e.target.value = "";
                }}
              />

              <button
                onClick={() => inputRef.current?.click()}
                className="p-2 text-xs bg-white rounded-lg opacity-50 hover:opacity-100"
              >
                or select files :D
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1"></div>
          )}
        </div>

        <div className="col-span-5 w-full h-full px-4 py-2 ">
          <h1>File info</h1>
        </div>
      </div>
    </div>
  );
}
