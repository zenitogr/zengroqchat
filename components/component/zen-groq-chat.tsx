/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/fQ1WTjJcZ8P
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import ChatBot from "@/components/ChatBot"

export function ZenGroqChat() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>VA</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Vercel AI</h2>
        </div>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzenitogr%2Fzengroqchat&env=GROQ_API_KEY&envDescription=create%20a%20groq%20api%20key%20at%20console.groq.com&envLink=console.groq.com&project-name=mygroqchat&repository-name=mygroqchat"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
      </header>
      <ChatBot />
    </div>
  );
}
