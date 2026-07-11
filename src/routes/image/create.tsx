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

      <div className="grid grid-cols-7 gap-4 h-[85vh]">
        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();

            const imported = importFiles(Array.from(e.dataTransfer.files));

            setItems((prev) => [...prev, ...imported]);

            if (selectedIndex === null && imported.length > 0) {
              setSelectedIndex(0);
            }
          }}
          className="col-span-2 w-full h-full bg-gray-200 rounded-xl"
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 w-full h-full px-4">
              <h1 className="text-xs text-center opacity-50">
                Drag and drop files to get started...
              </h1>

              <button
                onClick={() => inputRef.current?.click()}
                className="p-2 text-xs bg-white rounded-lg opacity-50 hover:opacity-100"
              >
                or select files :D
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex flex-row justify-between items-center gap-2 px-4 py-3 bg-gray-300 rounded-lg mb-2 w-full">
                <h1 className="text-xs">
                  {items.length > 1 ? `${items.length} files` : "1 file"}
                </h1>
                <div className="flex flex-row gap-2">
                  <button className="flex items-center justify-center text-white bg-red-400 opacity-50 hover:opacity-100 rounded-md w-[20px] h-[20px]">
                    -
                  </button>
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center justify-center text-white bg-green-400 opacity-50 hover:opacity-100 rounded-md w-[20px] h-[20px]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="px-3 py-1 flex flex-col gap-1">
                {items.map((item, index) => (
                  <button
                    key={`${item.file.name}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`rounded-lg p-2 text-[10px] text-left truncate ${
                      selectedIndex === index
                        ? "bg-gray-300"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {item.file.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 w-full h-full px-4 py-2 ">
          <h1>File info</h1>
        </div>
      </div>
    </div>
  );
}
