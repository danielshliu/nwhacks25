"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Paytone_One, Yeseva_One } from "next/font/google";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
// import Photo from "@/app/photo/page"
// import Login from "./login/page";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const paytonOne = Paytone_One({
  subsets: ["latin"],
  weight: ["400"],
});

const yesevaOne = Yeseva_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const queryData = useQuery(api.meals.listMeals, {
    userId: user?.id ?? "",
  });
  const mealImages = useQuery(api.meals.listMealImages, {
    userId: user?.id ?? "",
  });

  if (!isLoaded) return null;

  if (!isSignedIn) {
    router.push("/login");
    return null;
  }

  return (
    <div className="overscroll-x-none overscroll-y-none">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Paytone+One&family=Yeseva+One&display=swap"
        rel="stylesheet"
      ></link>

      <div className="bg-cream-white min-h-screen text-black">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div
            className={`text-xl font-bold text-black ${paytonOne.className}`}
          >
            <Link href="/">calorific</Link>
          </div>
          <div className="text-lg cursor-pointer text-black">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 max-w-6xl container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Hi, {user.firstName}!</h1>

          <h2 className="text-2xl mb-4">Saved meals:</h2>

          {/* Grid of Meal Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {/* Upload New Meal Card */}
            <div className="aspect-square bg-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
              <div className="text-9xl text-gray-500">
                <Link href="/photo">+</Link>
              </div>
            </div>

            {queryData &&
              queryData.map((meal) => {
                console.log(meal);
                const imageUrl = mealImages.find(
                  (image) => image.id === meal._id
                )?.imageUrl;

                console.log(imageUrl);

                return (
                  <Link
                    key={meal._id}
                    href={`/meal/${meal._id}`}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageUrl}
                      alt="Meal"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                );
              })}

            {/* Example Meal Cards - Replace with actual data mapping */}
            {/* <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/path-to-meal-image.jpg"
                alt="Meal"
                className="w-full h-full object-cover"
              />
              <div className="p-2">
                <h3 className="font-semibold">Pasta @ Rao's</h3>
                <p className="text-gray-600 text-sm">January 21, 2025</p>
              </div>
            </div> */}

            {/* Add more meal cards here */}
          </div>
        </div>
      </div>
    </div>
  );
}
