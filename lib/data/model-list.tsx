
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
  
  export default function ModelList() {
    const modelDivs = models.map(model =>
      <div key = {model.id}>{model.model}</div>
    );
    return <div className="flex flex-wrap gap-2">{modelDivs}</div>;
  }