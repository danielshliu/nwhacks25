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

    if (imageCache[image]) {
      return NextResponse.json(imageCache[image], { status: 200 });
    }

    // TODO: Add your image analysis logic here
    // For example, calling a third-party API or your own ML model

    const response = await ollama.chat({
      model: "llama3.2-vision",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that analyzes images and returns the food items in the image. Give their breakdown in components and calories of each component in the format:
      {
        "food": "Food Name",
        "components": [
          {
            "name": "Component Name",
            "calories": "Component Calories"
          }
        ]
      }

      Make sure you only return the JSON and nothing else.
      If you have any specifics on the ingredients or the food, add them to the components names. Make sure calories are integers only, and if a range, take the average.
      DO NOT RETURN ANYTHING ELSE, ONLY THE JSON. Estimate the food and components as best as you can. Sanity check your response using popular brands - if you are not sure, return the most likely option (Krispy Kreme for donuts, McDonalds for burgers, etc.)
      `,
        },
        {
          role: "user",
          images: [image],
        },
      ],
    });

    const text = response.message.content;

    // const response = await generateText({
    //   model: groq("llama-3.2-90b-vision-preview"),
    //   messages: [
    //     {
    //       role: "system",
    //       content: `You are a helpful assistant that analyzes images and returns the food items in the image. Give their breakdown in components and calories of each component in the format:
    //   {
    //     "food": "Food Name",
    //     "components": [
    //       {
    //         "name": "Component Name",
    //         "calories": "Component Calories"
    //       }
    //     ]
    //   }
    //   `,
    //     },
    //     {
    //       role: "user",
    //       content: image,
    //     },
    //   ],
    // });

    // const text = response.text;
    console.log(text);

    const json = JSON.parse(text);
    imageCache[image] = json;

    // Dummy response for now
    // const results = {
    //   foods: [
    //     {
    //       name: "Example Food",
    //       calories: 100,
    //       confidence: 0.95,
    //     },
    //   ],
    // };

    return NextResponse.json(json);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
