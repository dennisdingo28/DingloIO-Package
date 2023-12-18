"use client"

import { dingloIO } from "@/dinglo-io";
import { useEffect, useState } from "react"
import { DingloIOMessage } from "./DingloIOMessage";

export const DingloIOMessages = () =>{
    const [recievedMessages, setRecivedMessage] = useState<Array<String>>([]);
    useEffect(()=>{
        dingloIO.respond("mesaj de la suport");

        dingloIO.socket?.once("message_client",(message: string)=>{
            setRecivedMessage(prev=>[...prev,message]);
        });

        return () => dingloIO.off("message_client");
    },[]);
  
  

    return (
        <div className="h-[500px] py-2">
            {recievedMessages.map((msg, index)=>(
                <DingloIOMessage key={index} message={msg as string}/>
            ))}
        </div>
    )
}