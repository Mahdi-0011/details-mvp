import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY, 
    });

    const imageUrl = "https://ginatricot-pim.imgix.net/285331496/28533149601.jpg";

    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageBuffer).toString("base64");

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageData,
          },
        },
        { text: "write a describ for the image like that in swedish - Långärmad topp i spets med en djup halsringning.Toppen är röd och har en figurnära passform. Den har ett knytband framtill och en normal passform." },
      ],
    });

    return NextResponse.json({ caption: result.text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err}, { status: 500 });
  }
}
