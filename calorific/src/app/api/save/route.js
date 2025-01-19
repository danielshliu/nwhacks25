import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import ollama from "ollama";

// const groq = createGroq({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: process.env.GROQ_API_KEY,
// });

const imageCache = {};
export async function POST(request) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    return NextResponse.json(json);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
