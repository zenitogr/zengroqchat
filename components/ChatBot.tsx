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
  const [model, setModel] = useState<string>('gemma-7b-it');
  
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
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-primary text-primary-foreground py-2 px-2 flex justify-between  inset-x-0 items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>VA</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Vercel AI</h2>
        </div>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzenitogr%2Fzengroqchat&env=GROQ_API_KEY&envDescription=create%20a%20groq%20api%20key%20at%20console.groq.com&envLink=console.groq.com&project-name=mygroqchat&repository-name=mygroqchat"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
      </header>
    
      <div className="flex flex-col flex-grow items-center overflow-hidden">
          <div className=" flex flex-col-reverse bg-muted/40 px-1  mb-24 overflow-auto" style={{maxWidth: '1080px',overflowAnchor: 'auto'}}>
            {conversation.toReversed().map((message, index) => (
              <div key={index} className={`flex items-start gap-1 py-1 ${message.role === 'user' ? 'justify-end' : ''}`}>
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{message.role === 'user' ? 'JD' : 'VA'}</AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-2 max-w-[75%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        
        <div className="bg-background border-t px-1 py-1 flex gap-1 fixed bottom-0 inset-x-0 w-full flex-shrink-0">
          <div className="flex flex-col w-full items-center gap-1 overflow-hidden">
            <ModelList currentModel={model} setModel={setModel}/>
            <form onSubmit={handleSubmit} className="w-full flex flex-row justify-between gap-1">
              <Input id="message" placeholder="Type your message..." value={inputValue} onChange={handleInputChange} className="flex-1" autoComplete="off" />
              <Button type="submit" size="icon">
                <SendIcon className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}