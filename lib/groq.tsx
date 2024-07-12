"use server"
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

export default async function getGroqResponse(messages: { content: string, role: 'assistant' | 'user' }[]) {
  const { text } = await generateText({
    model: groq('gemma2-9b-it'),
    messages: messages
  });

  return text;
}