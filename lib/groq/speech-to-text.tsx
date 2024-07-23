"use server"
import Groq from "groq-sdk";
import { Readable } from "stream";
import fs from 'fs';
import { blobToBase64 } from '@/utils/blobToBase64';
function createStreamFromBase64(base64data: string): Readable {
  const buffer = Buffer.from(base64data, "base64");
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // Signals the end of the stream
  return stream;
}
export async function getGroqSpeechToText(audioBlob:Blob) {
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
    //create Filelike from audioBlob
    const file = new File([audioBlob], 'audio.mp3', {type: 'audio/mp3'});
    try {
        const transcription = await groq.audio.transcriptions.create({
            file: file,
            model: "whisper-large-v3",
            //prompt: "Specify context or spelling", // Optional
            //response_format: "json", // Optional
            //language: "en", // Optional
            //temperature: 0.0, // Optional
          });
    
        console.log(transcription.text);
        return transcription.text;
      } catch (error) {
        console.error("Error processing audio:", error);
        return "there was an error: " +error;
      }
    
  
  
}
