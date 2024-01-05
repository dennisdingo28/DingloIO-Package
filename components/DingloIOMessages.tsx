"use client"

import { useEffect, useRef } from "react";
import { DingloIOMessage } from "./DingloIOMessage";
import { dingloMessage } from "@/types";
import { DingloIOQuestions } from "./DingloIOQuestions";

interface DingloIOMessagesProps{
    receivedMessages:Array<dingloMessage>;
}

export const DingloIOMessages = ({receivedMessages}: DingloIOMessagesProps) =>{
    const containerRef = useRef(null);
    
    useEffect(()=>{
        if (containerRef.current) {
            //@ts-ignore
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
    },[receivedMessages]);

    return (
        <div ref={containerRef} className="h-[500px] p-2 space-y-6 overflow-y-scroll overflowContainer">
            <DingloIOQuestions/>
            {receivedMessages.map((msg, index)=>(
                <DingloIOMessage key={index} msg={msg}/>
            ))}
        </div>
    )
}