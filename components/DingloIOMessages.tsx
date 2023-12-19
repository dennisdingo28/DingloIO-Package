"use client"

import { dingloIO } from "@/dinglo-io";
import { useEffect, useState } from "react"
import { DingloIOMessage } from "./DingloIOMessage";
import { dingloMessage } from "@/types";

export const DingloIOMessages = () =>{
    const storedMessages = localStorage.getItem("DingloIO-messages");
    const initialMessages = storedMessages ? JSON.parse(storedMessages) : [];
    
    const [receivedMessages, setReceivedMessages] = useState<Array<dingloMessage>>(initialMessages);    
    useEffect(()=>{
        dingloIO.on("message_client",(message: dingloMessage)=>{
            setReceivedMessages(prev=>[...prev,message]);
        });

        return () => dingloIO.off("message_client");
    },[]);



    return (
        <div className="h-[500px] py-2 space-y-6 overflow-y-scroll overflowContainer">
            {receivedMessages.map((msg, index)=>(
                <DingloIOMessage key={index} isAgent={msg.isAgent} message={msg.message as string} messagedAt={msg.messagedAt}/>
            ))}
        </div>
    )
}