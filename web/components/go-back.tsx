"use client";

import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-transparent text-gray-200 px-4 py-2 rounded-full hover:text-gray-400 transition-colors"
    >
      &lt;
    </button>
  );
}
