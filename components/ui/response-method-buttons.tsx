import { useContext } from "react";
import { Button } from "./button";
import { ResponseMethodContext } from "@/lib/groq/response-method";

export default function responseMethodButtons( ) {
    const {responseMethod, setResponseMethod} = useContext(ResponseMethodContext);
    return (
        <div className="flex flex-row justify-center gap-4">
            <Button className={responseMethod === 'generateText' ?'bg-primary text-primary-foreground flex-1' : 'bg-background text-foreground flex-1'  } onClick={() => setResponseMethod('generateText')}>GenerateText</Button>
            <Button className={responseMethod === 'streamText' ?'bg-primary text-primary-foreground flex-1' : 'bg-background text-foreground flex-1' } onClick={() => setResponseMethod('streamText')}>StreamText</Button>
        </div>
    );
}