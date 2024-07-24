import { useContext } from "react";
import { Button } from "./button";
import { ResponseMethodContext } from "@/lib/groq/response-method";
import { ThemeColorContext } from "@/lib/theme-color";

export default function ResponseMethodButtons( ) {
    const {responseMethod, setResponseMethod} = useContext(ResponseMethodContext);
    const {color, setColor} = useContext(ThemeColorContext);
  const {color2, setColor2} = useContext(ThemeColorContext);
  const {colorText, setColorText} = useContext(ThemeColorContext);
  const {colorText2, setColorText2} = useContext(ThemeColorContext);
    return (
        <div className="flex flex-row justify-center gap-4">
            <Button className='flex-1' onClick={() => setResponseMethod('generateText')}
                style=
                {responseMethod === 'generateText'
                  ?
                   {backgroundColor: `rgba(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0}, ${color?.a/100 ?? 0})`,
                   color: `rgba(${colorText?.r ?? 0}, ${colorText?.g ?? 0}, ${colorText?.b ?? 0}, ${colorText?.a/100 ?? 0})`}
                   :
                    {backgroundColor: `rgba(${color2?.r ?? 0}, ${color2?.g ?? 0}, ${color2?.b ?? 0}, ${color2?.a/100 ?? 0})`,
                    color: `rgba(${colorText2?.r ?? 0}, ${colorText2?.g ?? 0}, ${colorText2?.b ?? 0}, ${colorText2?.a/100 ?? 0})`}}
            >GenerateText</Button>
            <Button className='flex-1' onClick={() => setResponseMethod('streamText')}
            style=
            {responseMethod === 'streamText' 
              ?
               {backgroundColor: `rgba(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0}, ${color?.a/100 ?? 0})`,
               color: `rgba(${colorText?.r ?? 0}, ${colorText?.g ?? 0}, ${colorText?.b ?? 0}, ${colorText?.a/100 ?? 0})`}
               :
                {backgroundColor: `rgba(${color2?.r ?? 0}, ${color2?.g ?? 0}, ${color2?.b ?? 0}, ${color2?.a/100 ?? 0})`,
                color: `rgba(${colorText2?.r ?? 0}, ${colorText2?.g ?? 0}, ${colorText2?.b ?? 0}, ${colorText2?.a/100 ?? 0})`}}
            >StreamText</Button>
        </div>
    );
}
