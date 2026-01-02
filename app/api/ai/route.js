import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { toolName, input } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is missing. Set GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    if (!toolName || !input) {
      return NextResponse.json(
        { error: "Missing toolName or input" },
        { status: 400 }
      );
    }

    //  Prompts for each tool
    const systemPrompts = {
      summarizer: "Summarize the following text clearly and concisely:",
      quiz: "Generate a multiple-choice quiz from this topic:",
      flashcards: "Create simple question-answer flashcards for this subject:",
      studyplan: "Create a detailed study plan based on this info:",
      explainer: "Explain the following concept in simple terms with examples:",
      codehelper: "Assist with this coding problem or debugging request:",
    };

    const systemPrompt =
      systemPrompts[toolName] || "Respond appropriately to the following input:";
    const fullPrompt = `${systemPrompt}\n\n${input}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(" Gemini API Error:", errorText);
      return NextResponse.json(
        { error: `Gemini API request failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      " No output generated.";

    return NextResponse.json({ result: output });
  } catch (err) {
    console.error(" API Route Error:", err);
    return NextResponse.json(
      { error: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}

