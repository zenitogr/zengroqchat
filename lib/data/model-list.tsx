import {Button} from '@/components/ui/button';
  export const models =  [
    {
        id : 1,
        model : 'gemma2-9b-it'
    },
    {
        id : 2,
        model :  'gemma-7b-it'
    },
    { 
        id : 3,
        model :'llama3-8b-8192'
    },
    {
        id : 4,
        model : 'llama3-70b-8192'
    }
    ,
    {
        id : 5,
        model : 'mixtral-8x7b-32768'
    }
  ];
  
  export default function ModelList({currentModel,setModel}: {currentModel:string,setModel: (model: string) => void}) {
    const modelDivs = models.map(model =>
      <Button
        key={model.id}
        onClick={() => setModel(model.model)}
        className={currentModel === model.model ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}
      >
        {model.model}
      </Button>
    );
    return <div className="flex flex-wrap gap-2">{modelDivs}</div>;
  }