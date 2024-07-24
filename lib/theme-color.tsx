"use client"
import { createContext, useState, Dispatch, SetStateAction } from 'react';





export const ThemeColorContext = createContext({
    color:{ r: 0, g: 0, b: 0, a: 0 },
    setColor: (prevColor:{ r: number, g: number, b: number, a: number }) => {},
    color2: { r: 0, g: 0, b: 0, a: 0 },
    setColor2: (prevColor2:{ r: number, g: number, b: number, a: number }) => {},
    colorText:{ r: 0, g: 0, b: 0, a: 0 },
    setColorText: (prevColor:{ r: number, g: number, b: number, a: number }) => {},
    colorText2: { r: 0, g: 0, b: 0, a: 0 },
    setColorText2: (prevColor2:{ r: number, g: number, b: number, a: number }) => {},
});

export const ThemeColorProvider = ({children}: {children: React.ReactNode}) => {
    const [color, setColor] = useState<{ r: number, g: number, b: number, a: number } >({r: 255, g: 0, b: 255, a: 100});
    const [color2, setColor2] = useState<{ r: number, g: number, b: number, a: number } >({r: 255, g: 255, b: 255, a: 100});
    const [colorText, setColorText] = useState<{ r: number, g: number, b: number, a: number } >({r: 255, g: 255, b: 255, a: 100});
    const [colorText2, setColorText2] = useState<{ r: number, g: number, b: number, a: number } >({r: 0, g: 0, b: 0, a: 100});

    return (
        <ThemeColorContext.Provider value={{color,setColor,color2,setColor2,colorText,setColorText,colorText2,setColorText2 }}>
            {children}  
        </ThemeColorContext.Provider>
    )
}

