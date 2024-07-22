"use client";
import { useEffect, useState, useRef, useContext } from "react";
import { blobToBase64 } from "@/utils/blobToBase64";
import { createMediaStream } from "@/utils/createMediaStream";
import { getGroqSpeechToText } from "@/lib/groq/speech-to-text";
import { ResponseMethodContext } from "@/lib/groq/response-method";
export const useRecordVoice = () => {
  const {micText, setMicText} = useContext(ResponseMethodContext);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder|null>(null);
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);
  const chunks = useRef<Blob[]>([]);

  const startRecording = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const getText = async (base64data: any) => {
    try {
      const response = await getGroqSpeechToText('tmp/recording.mp3', base64data);
      setMicText(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      createMediaStream(stream);
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/mpeg-3" });
      blobToBase64(audioBlob, getText);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []);

  return { recording, startRecording, stopRecording };
};