"use server"
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

export async function getGroqResponse(model: string, messages: Message[]) {
  const { text } = await generateText({
    model: groq(model),
    system: "You are a friendly assistant!",
    messages: messages
  });

  return {
    messages: [
      ...messages,
      {
        role: 'assistant' as const,
        content: text,
      },
    ],
  };
}