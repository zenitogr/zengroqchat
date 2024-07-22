"use server"
import Groq from "groq-sdk";
import { Readable } from "stream";
import fs from 'fs';

export async function getGroqSpeechToText(path:string,base64data:string) {
    const audio = Buffer.from(base64data, "base64");
    const filePath = path;
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
    try {
        fs.writeFileSync(filePath, audio);
        const readStream = fs.createReadStream(filePath);
        const transcription = await groq.audio.transcriptions.create({
            file: readStream,
            model: "whisper-large-v3",
            //prompt: "Specify context or spelling", // Optional
            //response_format: "json", // Optional
            //language: "en", // Optional
            //temperature: 0.0, // Optional
          });
        // Remove the file after use
        fs.unlinkSync(filePath);
    
        console.log(transcription.text);
        return transcription.text;
      } catch (error) {
        console.error("Error processing audio:", error);
        return "there was an error: " +error;
      }
    
  
  
}
