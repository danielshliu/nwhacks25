"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageData = searchParams.get("image");
    if (imageData) {
      setImage(`data:image/png;base64,${imageData}`);
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Analyzing Your Meal</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt="Meal to analyze"
            className="max-h-[50vh] object-contain rounded-lg shadow-lg mx-auto"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-neutral-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            {/* Add analysis results here */}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push("/")}
          className="text-white text-lg font-semibold"
        >
          Take Another Photo
        </button>
      </div>
    </div>
  );
}

export default function Analyze() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div>Loading...</div>
        </div>
      }
    >
      <AnalyzeContent />
    </Suspense>
  );
}
