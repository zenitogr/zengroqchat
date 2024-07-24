"use client"
import { createContext, useContext, useState } from 'react';
import { ThemeColorContext } from '../theme-color';


export const ResponseMethodContext = createContext(
    {
    responseMethod:'',
    setResponseMethod: (method: string) => {},
    micText: '',
    setMicText: (text: string) => {},

    }
)

export const ResponseMethodProvider = ({children}: {children: React.ReactNode}) => {
    const {color, setColor} = useContext(ThemeColorContext);
  const {color2, setColor2} = useContext(ThemeColorContext);
  const {colorText, setColorText} = useContext(ThemeColorContext);
  const {colorText2, setColorText2} = useContext(ThemeColorContext);
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

