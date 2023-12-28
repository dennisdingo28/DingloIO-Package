"use client"

import { DingloIOMessage } from "./DingloIOMessage";
import { dingloMessage } from "@/types";

export const DingloIOMessages = ({receivedMessages}:{receivedMessages: Array<dingloMessage>}) =>{
  
    return (
        <div className="h-[500px] p-2 space-y-6 overflow-y-scroll overflowContainer">
            {receivedMessages.map((msg, index)=>(
                <DingloIOMessage key={index} isAgent={msg.isAgent} isNew={msg.isNew} message={msg.message as string} messagedAt={msg.messagedAt}/>
            ))}
        </div>
    )
}