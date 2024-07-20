"use client"
import { Button } from '@/components/ui/button';
import { createContext, useState } from 'react';


export const ResponseMethodContext = createContext(
    {
    responseMethod:'',
    setResponseMethod: (method: string) => {},

    }
)

export const ResponseMethodProvider = ({children}: {children: React.ReactNode}) => {
    const [responseMethod, setResponseMethod] = useState<string>('streamText');

    return (
        <ResponseMethodContext.Provider
            value={{
                responseMethod,
                setResponseMethod
            }}
        >
            {children}  
        </ResponseMethodContext.Provider>
    )
}

