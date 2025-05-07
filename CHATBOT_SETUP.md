# Gemini AI Chatbot Setup Instructions

This guide explains how to set up and configure the Gemini AI integration for the chatbot in your portfolio.

## Step 1: Get a Google AI API Key

1. Go to the [Google AI Studio](https://ai.google.dev/) and sign in with your Google account
2. Navigate to the API section and create a new API key
3. Copy your API key for the next step

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory of your project and add your API key:

```
GEMINI_API_KEY=your_api_key_here
```

## Step 3: Install Required Dependencies

Run the following command to install the necessary package:

```bash
npm install @google/generative-ai
```

## Step 4: Optional - Update the API Implementation

If you want to use the official Google Generative AI SDK instead of fetch, you can modify the `src/app/api/gemini/route.ts` file to use the SDK:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// System prompt (unchanged)
const SYSTEM_PROMPT = `...`; // Keep the existing system prompt

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand and I'm ready to assist with questions about Billstein's portfolio." }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    // Generate a response
    const result = await chat.sendMessage(message);
    const response = result.response;
    const aiResponse = response.text();

    return NextResponse.json({ response: aiResponse });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Usage Notes

- The chatbot will now generate dynamic responses using Google's Gemini AI
- The system prompt provides context about your portfolio
- You can update the system prompt in `src/app/api/gemini/route.ts` to include more details about your portfolio, projects, or skills
- Remember to keep your API key secure and never commit it to version control

## Troubleshooting

- If you get authentication errors, verify your API key is correct
- If you get model unavailability errors, check the model name or your quota limits
- For local development, ensure you're running the application in development mode with `npm run dev` 