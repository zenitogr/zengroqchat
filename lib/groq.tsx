"use server"
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

export default async function getGroqResponse(userMessage: string) {
  const { text } = await generateText({
    model: groq('gemma2-9b-it'),
    prompt: userMessage
  });

  return text;
}