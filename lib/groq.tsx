"use server"
import { createOpenAI } from '@ai-sdk/openai'
import { generateText,streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc';
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
export async function generate(model:string,messages: Message[]) {
  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: groq(model),
      system: "You are a friendly assistant!",
      messages: messages
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return {
    messages: messages,
    newMessage: stream.value,
  };
}