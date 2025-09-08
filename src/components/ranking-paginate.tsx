'use client';

import { useMusicsStore } from "@/store/musics-store";

export default function Pagination() {
  const { page, limit, total, fetchMusics } = useMusicsStore();

  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 ">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => fetchMusics(p)}
          className={`px-3 py-1 rounded ${
            p === page
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
