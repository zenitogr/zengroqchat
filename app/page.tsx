"use client"
import ChatBot from '@/components/component/ChatBot';
import Header from '@/components/component/header';
import { useState } from 'react';

export default function Home() {
  
  const [method,setMethod] = useState('generateText')
  
  return (
    <>
    <Header method={method} setMethod={setMethod}/>
    <ChatBot method={method} />
    </>
  );
}
