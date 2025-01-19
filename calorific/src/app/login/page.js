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
import Link from "next/link";

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
        <Link className="text-xl font-bold text-black" href="/">
          calorific
        </Link>
      </div>

      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-bold mb-2 text-center text-black">
          Log in
        </h2>
        <p className="text-center mb-8 text-black">
          Don't have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </p>

        <SignedOut>
          <SignInButton>
            <button className="w-full bg-[#E4B7A0] text-black py-3 rounded-full hover:bg-[#d6a08c] focus:outline-none transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-black"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-black"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E4B7A0] text-black py-3 rounded-full hover:bg-[#d6a08c] focus:outline-none transition-colors"
          >
            Log in
          </button>
        </form> */}
      </div>
    </div>
  );
}
