import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { items } = await req.json();
    const prompt = `Generate a recipe using the following ingredients: ${items
      .map((item) => `${item.quantity} ${item.name}`)
      .join(", ")}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipe = await response.text();

    const formattedRecipe = formatRecipeText(recipe);

    return NextResponse.json({ recipe: formattedRecipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Error generating recipe", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response("Method not allowed", { status: 405 });
}

function formatRecipeText(text) {
  const lines = text.split("\n");
  let formattedText = "";

  lines.forEach((line) => {
    if (line.startsWith("##")) {
      formattedText += `<h2>${line.substring(2).trim()}</h2>`;
    } else if (line.startsWith("*")) {
      formattedText += `<li>${line.substring(1).trim()}</li>`;
    } else if (line.match(/^\d+\./)) {
      formattedText += `<p>${line}</p>`;
    } else {
      formattedText += `<p>${line}</p>`;
    }
  });

  return formattedText;
}
