/** @format */

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const jsonModule = await import("../../../data/products.json");
    const jsonObj = jsonModule.default;
    const jsonText = JSON.stringify(jsonObj, null, 2);

    const prompt = `Här är min JSON-fil (produkter):${jsonText}
        Skriv en beskrivning av varje produkt på svenska, max 100 ord.
        Tonen ska vara ungefär så här:"
        Långärmad topp i spets med en djup halsringning.
        Toppen är röd och har en figurnära passform. 
        Den har ett knytband framtill och en normal passform.
        Skriv för de 20 första produkterna.
        skriv för varje produkt några nyckelord efter beskrivningen.
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{ text: prompt }],
    });

    const description =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No AI response.";

    return NextResponse.json({ describe: description });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
