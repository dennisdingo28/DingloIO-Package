"use client"

import { dingloIO } from "@/dinglo-io";
import { useEffect, useState } from "react"

export const DingloIOMessages = () =>{
    const [recievedMessages, setRecivedMessage] = useState<Array<String>>([]);

    useEffect(()=>{
        dingloIO.on("message_client",(message: string)=>{
            console.log("re");
            
            setRecivedMessage(prev=>[...prev,message]);
        });
    },[dingloIO]);
   

    return (
        <div className="h-[500px] py-2">
            {recievedMessages.map((msg, index)=>(
                <p key={index}>{msg}</p>
            ))}
        </div>
    )
}