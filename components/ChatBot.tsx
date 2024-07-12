"use client"
import React, { useState } from 'react';
import  getGroqResponse  from '@/lib/groq';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendIcon } from 'lucide-react';
export default function ChatBot() {
  const [messages, setMessages] = useState<{ message: string, sender: 'ai' | 'user' }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const response = await getGroqResponse(inputValue);
      setMessages([...messages, { message: inputValue, sender: 'user' }, { message: response, sender: 'ai' }]);
      setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-6 bg-muted/40">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{message.sender === 'user' ? 'JD' : 'VA'}</AvatarFallback>
              </Avatar>
              <div className={`bg-${message.sender === 'user' ? 'card' : 'primary'}-text-foreground rounded-lg p-4 max-w-[75%]`}>
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-background border-t px-6 py-4 flex items-center gap-4">
        <form onSubmit={handleSubmit} className="w-full flex flex-row justify-between gap-4">
          <Input id="message" placeholder="Type your message..." value={inputValue} onChange={handleInputChange} className="flex-1" autoComplete="off" />
          <Button type="submit" size="icon">
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}