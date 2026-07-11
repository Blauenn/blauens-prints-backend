import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blauens Prints - backend</h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/image/create">
          <div className="px-4 py-2 flex flex-col justify-center items-center rounded-xl bg-white border border-gray-200 hover:bg-blue-200">
            <h1 className="text-lg">Create</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
