"use client";

// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignOutButton,
//   UserButton,
// } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Paytone_One } from "next/font/google";

import Link from "next/link";

const paytonOne = Paytone_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function login() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  return (
    <div className="bg-cream-white flex flex-col items-center justify-center h-screen">
      {/* Header */}

      <div className="absolute top-0 left-0 p-4 flex justify-between w-full">
        <Link
          className={`text-xl font-bold text-black ${paytonOne.className}`}
          href="/"
        >
          calorific
        </Link>
      </div>

      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-bold mb-2 text-center text-black">
          Log in
        </h2>
        <p className="text-center mb-4 text-black">
          Don't have an account?{" "}
          {/* <a href="/signup" className="underline">
            Sign up
          </a> */}
        </p>

        <SignedOut>
          <SignInButton>
            <button className="w-full bg-[#E4B7A0] text-black py-3 rounded-full hover:bg-[#d6a08c] focus:outline-none transition-colors">
              Sign In / Sign up
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>


      </div>
    </div>
  );
}
