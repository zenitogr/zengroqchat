"use server"
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const models =  {
  gemma2_9b_it : 'gemma2-9b-it',
  gemma_7b_it :  'gemma-7b-it',
  llama3_8b :'llama3-8b-8192',
  llama3_70b : 'llama3-70b-8192',
  mixtral_8x7b : 'mixtral-8x7b-32768'

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