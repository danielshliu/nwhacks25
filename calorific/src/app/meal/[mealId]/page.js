"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function MealPage() {
  const params = useParams();
  const { isLoaded, isSignedIn, user } = useUser();
  const queryData = useQuery(api.meals.listMeals, {
    userId: user?.id ?? "",
  });
  const mealImages = useQuery(api.meals.listMealImages, {
    userId: user?.id ?? "",
  });
  const mealId = params.mealId;
  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  if (!queryData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const meal = queryData?.find((meal) => meal._id === mealId);
  const mealImage = mealImages?.find((image) => image.id === meal._id);

  console.log("mealImage", mealImage);

  return (
    <div className="p-6 bg-[#FDF8F5] text-black">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold">{meal?.food}</h1>
        <button className="text-2xl">✎</button>
      </div>

      <div className="h-2/5 mb-8">
        {mealImage && (
          <img
            src={mealImage.imageUrl}
            alt="Analyzed meal"
            className="object-scale-down max-h-full m-auto rounded-3xl shadow-lg mb-4"
            width={500}
            height={500}
          />
        )}
        <div className="text-2 font-semibold">
          ~{" "}
          {meal?.components
            .map((component) => component.calories)
            .reduce((a, b) => a + b, 0)}{" "}
          kcal
        </div>
      </div>

      {/* Components List */}
      <div className="mt-4">
        <h2 className="text-xl mb-4">Components:</h2>
        <div className="space-y-2">
          {meal?.components?.map((component, index) => (
            <div
              key={index}
              className={`flex justify-between items-center rounded-lg p-2 ${
                index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
              }`}
            >
              <span className="text-lg">{component.name}</span>
              <span className="text-lg text-orange-600">
                {component.calories} kcal
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-x-6 items-center">
        <button
          onClick={() => {
            resetCamera();
          }}
          className="w-full rounded-full border-[1px] border-orange-300 py-3 mt-6 bg-[#D3C5B7] text-black text-lg font-semibold"
        >
          Take Another Photo
        </button>

        {/* {isLoaded && (
          <button
            onClick={() => {
              saveMeal();
            }}
            className="w-full rounded-full border-[1px] border-orange-300 py-3 mt-6 bg-[#F9AC76] text-black text-lg font-semibold"
          >
            Save Meal
          </button>
        )} */}
      </div>
    </div>
  );
  // <div className="p-6 bg-[#FDF8F5] text-black">
  //   <div className="flex items-center gap-2">
  //     <h1 className="text-4xl font-bold">{meal.name}</h1>
  //     <button className="text-2xl">✎</button>
  //   </div>

  //   <div className="h-2/5 mb-8">
  //     {mealImage && (
  //       <img
  //         src={mealImage.imageUrl}
  //         alt="Meal photo"
  //         className="object-scale-down max-h-full m-auto rounded-3xl shadow-lg mb-4"
  //       />
  //     )}
  //     <div className="text-2 font-semibold">~ {meal.calories} kcal</div>
  //   </div>

  //   {meal.components && (
  //     <div className="mt-4">
  //       <h2 className="text-xl mb-4">Components:</h2>
  //       <div className="space-y-2">
  //         {meal.components.map((component, index) => (
  //           <div
  //             key={index}
  //             className={`flex justify-between items-center rounded-lg p-2 ${
  //               index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
  //             }`}
  //           >
  //             <span className="text-lg">{component.name}</span>
  //             <span className="text-lg text-orange-600">
  //               {component.calories} kcal
  //             </span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   )}

  //   {meal.notes && (
  //     <div className="mt-4">
  //       <h2 className="text-xl mb-4">Notes:</h2>
  //       <p className="mt-2">{meal.notes}</p>
  //     </div>
  //   )}
  // </div>
  // );
}
