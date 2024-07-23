"use client"
import React, { useContext, useEffect, useState } from 'react';
import  {getGroqResponse, Message,getGroqStreamingResponse } from '@/lib/groq/groq-response';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SendIcon } from 'lucide-react';
import ModelList from '@/lib/groq/model-list';
import { readStreamableValue } from 'ai/rsc';
import { Microphone } from '../ui/mic-button';
import {ResponseMethodContext} from '@/lib/groq/response-method';
import ResponseMethodButtons from '../ui/response-method-buttons';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MarkdownRenderer } from '@/components/component/markdown';
import rehypeRaw from 'rehype-raw';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function ChatBox() {
  const [conversation, setConversation] = useState<Message[]>([{ content: 'Hello! I am Vercel AI. How can I help you?', role: 'assistant' }]);
  const [inputValue, setInputValue] = useState('');
  const [model, setModel] = useState<string>('gemma-7b-it');
  const {responseMethod, setResponseMethod} = useContext(ResponseMethodContext);
  const {micText, setMicText} = useContext(ResponseMethodContext);

  useEffect (() => {
    setInputValue(prevValue => prevValue + " " + micText);
  }, [micText])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      if (responseMethod === 'generateText') {
        const {messages} = await getGroqResponse(model,[...conversation, { content: inputValue, role: 'user' }]);
        setConversation(messages);
        setInputValue('');
      }else //responseMethod === 'streamText'
      { 
        const { messages, newMessage } = await getGroqStreamingResponse(model,[
          ...conversation,
          { role: 'user', content: inputValue },
        ]);
        setInputValue('');
        let textContent = '';
        
        for await (const delta of readStreamableValue(newMessage)) {
          textContent = `${textContent}${delta}`;
        
          setConversation([
            ...messages,
            { role: 'assistant', content: textContent },
          ]);
          
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    
    
      
        <>
        <div className="flex-1 overflow-auto">
          <div className=" flex flex-col-reverse bg-muted/40 px-1 justify-end   w-full flex-1 overflow-auto " style={{overflowAnchor: 'auto'}}>
          
            {conversation.toReversed().map((message, index) => (
              <div key={index} className={`flex items-start gap-1 py-1 ${message.role === 'user' ? 'justify-end' : ''} `}>
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{message.role === 'user' ? 'JD' : 'VA'}</AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-2 max-w-[75%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>
                
                <MarkdownRenderer>{message.content}</MarkdownRenderer>
                
                </div>
              </div>
            ))}
            
          </div>
        </div>
        
        <div className="bg-background border-t px-1 py-1 gap-1  sticky bottom-0 z-10 overflow-hidden">
          <div className="flex flex-col w-full items-center gap-1 overflow-hidden">
            <ResponseMethodButtons />
            <ModelList currentModel={model} setModel={setModel}/>
            <form onSubmit={handleSubmit} className="w-full flex flex-row justify-between gap-1">
              <Input id="message" placeholder="Type your message..." value={inputValue} onChange={handleInputChange} className="flex-1" autoComplete="off" />
              
              <Button type="submit" size="icon">
                <SendIcon className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <div className="flex justify-center items-center gap-4">
            <p>Press and hold to input text using voice:</p><Microphone />
            </div>
          </div>
        </div>
        </>     
    
  );
}