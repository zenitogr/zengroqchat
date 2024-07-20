import {Button} from '@/components/ui/button';
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
    }
  ];
  
  export default function ModelList({currentModel,setModel}: {currentModel:string,setModel: (model: string) => void}) {
    const modelDivs = models.map(model => {
    
      if (model.type === 'text') {
      return <Button
        key={model.id}
        onClick={() => setModel(model.model)}
        className={currentModel === model.model ? 'bg-primary text-primary-foreground flex-1' : 'bg-background text-foreground flex-1'}
      >
        {model.name}
      </Button>
      }}
    );
    return <div className="flex w-full overflow-auto">{modelDivs}</div>;
  }