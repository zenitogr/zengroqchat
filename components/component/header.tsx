"use client"
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
export default function Header({method,setMethod}: {method:string,setMethod: (method: string) => void}) {
    
    
  return (
      <header className="bg-primary text-primary-foreground py-2 px-2 flex justify-between  inset-x-0 items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>VA</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Vercel AI</h2>
        </div>
        <div className="flex gap-4">
        <Button variant={method === 'generateText' ? 'default' : 'outline'} onClick={() => setMethod('generateText')}>GenerateText</Button>
        <Button variant={method === 'streamText' ? 'default' : 'outline'} onClick={() => setMethod('streamText')}>StreamText</Button>
        </div>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzenitogr%2Fzengroqchat&env=GROQ_API_KEY&envDescription=create%20a%20groq%20api%20key%20at%20console.groq.com&envLink=console.groq.com&project-name=mygroqchat&repository-name=mygroqchat"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
      </header>
  );
}
