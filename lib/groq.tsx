"use server"
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const models =  [
  {model: 'gemma2-9b-it'},
  {model :  'gemma-7b-it'},
  {model :'llama3-8b-8192'},
  {model : 'llama3-70b-8192'},
  {model : 'mixtral-8x7b-32768'}
]
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