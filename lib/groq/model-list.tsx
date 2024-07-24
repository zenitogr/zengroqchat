import {Button} from '@/components/ui/button';
import { useContext } from 'react';
import { ThemeColorContext } from '../theme-color';
  export const models =  [
    {
      id : 1,
      model : 'gemma2-9b-it',
      name: "gemma2",
      type: 'text'
    },
    {
      id : 2,
      model :  'gemma-7b-it',
      name: "gemma",
      type: 'text'
    },
    { 
      id : 3,
      model :'llama3-8b-8192',
      name: 'llama3-8b',
      type: 'text'
    },
    {
      id : 4,
      model : 'llama3-70b-8192',
      name: 'llama3-70b',
      type: 'text'
    },
    {
      id : 5,
      model : 'mixtral-8x7b-32768',
      name: 'mixtral-8x7b',
      type: 'text'
    },
    {
      id:6,
      model:'whisper-large-v3',
      name:'whisper',
      type: 'audio'
    },
    {
      id:7,
      model:'llama-3.1-70b-versatile',
      name:'the-versatile',
      type: 'text'
    },
    {
      id:8,
      model:'llama-3.1-8b-instant',
      name:'the-instant',
      type: 'text'
    }
  ];
  
  export default function ModelList({currentModel,setModel}: {currentModel:string,setModel: (model: string) => void}) {
    const {color, setColor} = useContext(ThemeColorContext);
  const {color2, setColor2} = useContext(ThemeColorContext);
  const {colorText, setColorText} = useContext(ThemeColorContext);
  const {colorText2, setColorText2} = useContext(ThemeColorContext);
    const modelDivs = models.map(model => {
    
      if (model.type === 'text') {
      return <Button
        key={model.id}
        onClick={() => setModel(model.model)}
        className="flex-1"
        style=
        {currentModel === model.model 
          ?
           {backgroundColor: `rgba(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0}, ${color?.a/100 ?? 0})`,
           color: `rgba(${colorText?.r ?? 0}, ${colorText?.g ?? 0}, ${colorText?.b ?? 0}, ${colorText?.a/100 ?? 0})`}
           :
            {backgroundColor: `rgba(${color2?.r ?? 0}, ${color2?.g ?? 0}, ${color2?.b ?? 0}, ${color2?.a/100 ?? 0})`,
            color: `rgba(${colorText2?.r ?? 0}, ${colorText2?.g ?? 0}, ${colorText2?.b ?? 0}, ${colorText2?.a/100 ?? 0})`}}
      >
        {model.name}
      </Button>
      }}
    );
    return <div className="flex w-full overflow-auto">{modelDivs}</div>;
  }