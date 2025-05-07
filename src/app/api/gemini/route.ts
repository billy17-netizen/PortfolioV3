import { NextRequest, NextResponse } from 'next/server';

// In a production environment, store the API key using environment variables
// This is a fallback for demo purposes only
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCvQ-hkzLWtHwkWfb65uiWxEOWUHHeoIH8";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Create a system prompt that provides context about the portfolio
const SYSTEM_PROMPT = `
You are an AI assistant for a portfolio website belonging to Billstein Maelgweyn Lelatobur, a Fullstack Web Developer.
Answer questions about the portfolio, projects, skills, and experiences concisely and professionally.

Here's information about the portfolio:

ABOUT:
Billstein is a Fullstack Web Developer passionate about crafting beautiful, functional websites with modern technologies. 
With over 5 years of professional experience, he specializes in creating interactive web applications with clean code and intuitive user experiences.

PROJECTS:
1. OrFarm: E-commerce platform offering food products, built with Laravel, Bootstrap, and MySQL.
2. Dodobus: Bus ticket booking platform built with Next.js, TailwindCSS, Framer Motion, Redux/Context API, PostgreSQL, and Prisma ORM.
3. Tools Midwife: Digital platform for midwives with calculators and tools, built with Next.js, TypeScript, and Tailwind CSS.
4. Portfolio Website: A neo-brutalist portfolio using Next.js, Tailwind CSS, TypeScript, GSAP, and ScrollTrigger.
5. RoastInsting: Web app that "roasts" Instagram profiles using AI, built with React, Tailwind CSS, TypeScript, Apify API, and Gemini AI.

SKILLS:
- Frontend: React, Vue.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Framer Motion, GSAP
- Backend: PHP, Laravel, Node.js, Express, Prisma ORM, RESTful APIs, GraphQL
- Database: MySQL, PostgreSQL, MongoDB
- DevOps: Git, GitHub, CI/CD, Docker, Vercel, Netlify
- Design: Figma, Adobe XD, Responsive Design, UI/UX Principles

Keep responses brief and to the point, focusing on the most relevant information. The website has a neo-brutalist design aesthetic.
`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Prepare the request to Gemini API
    const data = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SYSTEM_PROMPT },
            { text: message }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    };

    // Make the request to Google's Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // Parse the response
    const result = await response.json();
    
    // Check for errors in the Gemini API response
    if (!response.ok) {
      console.error("Gemini API Error:", result);
      return NextResponse.json(
        { error: "Failed to get response from Gemini" },
        { status: response.status }
      );
    }

    // Extract the text response from Gemini
    const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || 
                       "I'm having trouble answering that right now. Please try again later.";

    return NextResponse.json({ response: aiResponse });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 