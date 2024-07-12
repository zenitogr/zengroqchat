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
  
  export default function ModelList(currentModel: string, setCurrentModel: (model: string) => void) {
    const modelDivs = models.map(model =>
      <Button key = {model.id} onClick={() => setCurrentModel(model.model)}>{model.model}</Button>
    );
    return <div className="flex flex-wrap gap-2">{modelDivs}</div>;
  }