"use client"
import React, { useContext,useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ThemeColorContext  } from "@/lib/theme-color";
import { Modal } from '@/components/component/modal'


export default function NavBar() {
  const {color, setColor} = useContext(ThemeColorContext);
  const {color2, setColor2} = useContext(ThemeColorContext);
  const {colorText, setColorText} = useContext(ThemeColorContext);
  const {colorText2, setColorText2} = useContext(ThemeColorContext);

    
  return (
      <header className=" text-primary-foreground py-2 px-2 flex justify-between  inset-x-0 items-center sticky top-0 z-10 overflow-hidden " style={{backgroundColor: `rgba(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0}, ${color?.a/100 ?? 0})`}}>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>VA</AvatarFallback>
          </Avatar>
          <h2 
          className="text-xl font-semibold" 
          style=
          {{
            backgroundColor: `rgba(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0}, ${color?.a/100 ?? 0})`,
            color: `rgba(${colorText?.r ?? 0}, ${colorText?.g ?? 0}, ${colorText?.b ?? 0}, ${colorText?.a/100 ?? 0})`}}
          >Vercel AI</h2>
        </div>
        <div className="flex gap-4">
          <Modal />
        </div>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzenitogr%2Fzengroqchat&env=GROQ_API_KEY&envDescription=create%20a%20groq%20api%20key%20at%20console.groq.com&envLink=console.groq.com&project-name=mygroqchat&repository-name=mygroqchat"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
      </header>
  );
}
