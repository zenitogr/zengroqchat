"use client"
import { Button } from '@/components/ui/button';
import { createContext, useState } from 'react';


export const ResponseMethodContext = createContext(
    {
    responseMethod:'',
    setResponseMethod: (method: string) => {},
    micText: '',
    setMicText: (text: string) => {},

    }
)

export const ResponseMethodProvider = ({children}: {children: React.ReactNode}) => {
    const [responseMethod, setResponseMethod] = useState<string>('streamText');
    const [micText, setMicText] = useState<string>('');

    return (
        <ResponseMethodContext.Provider
            value={{
                responseMethod,
                setResponseMethod,
                micText,
                setMicText
            }}
        >
            {children}  
        </ResponseMethodContext.Provider>
    )
}

