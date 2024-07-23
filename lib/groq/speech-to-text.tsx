"use server"
import Groq from "groq-sdk";

export async function getGroqSpeechToText(audioBlobString:string) {/* 
    console.log( audioBlobString ); */
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
    //create Filelike from audioBlob
    const parsed = JSON.parse(audioBlobString);
    const blob = await fetch(parsed.blob).then((res) => res.blob());
    /* const audioBlob = new Blob([audioBlobString], {type: 'audio/mp3'}); */
    const file = new File([blob], 'audio.mp3', {type: 'audio/mp3'});
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
