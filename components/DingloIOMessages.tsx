"use client"

import { DingloIOMessage } from "./DingloIOMessage";
import { dingloMessage } from "@/types";

interface DingloIOMessagesProps{
    receivedMessages:Array<dingloMessage>;
}

export const DingloIOMessages = ({receivedMessages}: DingloIOMessagesProps) =>{
  
    return (
        <div className="h-[500px] p-2 space-y-6 overflow-y-scroll overflowContainer">
            {receivedMessages.map((msg, index)=>(
                <DingloIOMessage key={index} msg={msg}/>
            ))}
        </div>
    )
}