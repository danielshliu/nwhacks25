"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { useUser } from "@clerk/nextjs";

export default function MealPage() {
  const params = useParams();
  const { isLoaded, isSignedIn, user } = useUser();
  const mealId = params.mealId;

  const meal = useQuery(api.meals.listMeals);

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{meal.name}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Calories:</p>
            <p className="font-semibold">{meal.calories}</p>
          </div>
          <div>
            <p className="text-gray-600">Date:</p>
            <p className="font-semibold">
              {new Date(meal.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {meal.notes && (
          <div className="mt-4">
            <p className="text-gray-600">Notes:</p>
            <p className="mt-2">{meal.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
