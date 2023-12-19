"use client"

import { dingloIO } from "@/dinglo-io";
import { useEffect, useState } from "react"
import { DingloIOMessage } from "./DingloIOMessage";
import { dingloMessage } from "@/types";

export const DingloIOMessages = () =>{
    const [recievedMessages, setRecievedMessage] = useState<Array<dingloMessage>>([{message:'test from support',isAgent:true, messagedAt:new Date()}]);
    useEffect(()=>{
        dingloIO.on("message_client",(message: dingloMessage)=>{
            setRecievedMessage(prev=>[...prev,message]);
        });

        return () => dingloIO.off("message_client");
    },[]);



    return (
        <div className="h-[500px] py-2 space-y-6 overflow-y-scroll overflowContainer">
            {recievedMessages.map((msg, index)=>(
                <DingloIOMessage key={index} isAgent={msg.isAgent} message={msg.message as string} messagedAt={msg.messagedAt}/>
            ))}
        </div>
    )
}