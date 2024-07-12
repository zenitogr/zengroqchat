"use client"
import React, { useEffect, useState } from 'react';
import  {getGroqResponse, Message } from '@/lib/groq';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendIcon } from 'lucide-react';
import ModelList from '@/lib/data/model-list';
export default function ChatBot() {
  const [conversation, setConversation] = useState<Message[]>([{ content: 'Hello! I am Vercel AI. How can I help you?', role: 'assistant' }]);
  const [inputValue, setInputValue] = useState('');
  const [model, setModel] = useState<string>('gemma2-9b-it');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const {messages} = await getGroqResponse(model,[...conversation, { content: inputValue, role: 'user' }]);
      setConversation(messages);
      setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      
        <div className="space-y-4 overflow-auto flex flex-col-reverse bg-muted/40 px-4 mt-24 mb-32 " style={{overflowAnchor: 'auto'}}>
          {conversation.toReversed().map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{message.role === 'user' ? 'JD' : 'VA'}</AvatarFallback>
              </Avatar>
              <div className={`rounded-lg p-4 max-w-[75%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      
      <div className="bg-background border-t px-6 py-2 flex gap-4 fixed bottom-0 inset-x-0">
        <div className="flex flex-col w-full items-center gap-2">
          <ModelList currentModel={model} setModel={setModel}/>
          <form onSubmit={handleSubmit} className="w-full flex flex-row justify-between gap-4">
            <Input id="message" placeholder="Type your message..." value={inputValue} onChange={handleInputChange} className="flex-1" autoComplete="off" />
            <Button type="submit" size="icon">
              <SendIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}