"use client";

import { Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DingloIOProfile } from "./DingloIOProfile";
import { DingloIOSettings } from "./DingloIOSettings";
import { DingloIOMessages } from "./DingloIOMessages";
import { DingloIOSubmit } from "./DingloIOSubmit";
import { useEffect, useState } from "react";
import dingloIO from "@/dinglo-io";
import { dingloMessage } from "@/types";

export const DingloIOWidget = () => {
  const [receivedMessages, setReceivedMessages] = useState<Array<dingloMessage>>([]);    
  const [newMessages, setNewMessages] = useState<boolean>(false);
  const [availableAgent, setAvailableAgent] = useState<boolean>(false);

  useEffect(()=>{
        dingloIO.on("message_client",(message: dingloMessage)=>{
            setReceivedMessages(prev=>[...prev,message]);
            if(!newMessages)
              setNewMessages(true);
        });
        dingloIO.on("available_agent", (isAvailableAgent)=>{
            setAvailableAgent(isAvailableAgent);
        });
     

        return () => {
          dingloIO.off("message_client");
          dingloIO.off("available_agent");
        };
    },[]);
    
  return (
    <div className="fixed bottom-2 right-2">
      <Popover onOpenChange={()=>setNewMessages(false)}>
        <PopoverTrigger asChild>
          <div className={`w-[60px] h-[60px] hover:w-[63px] rounded-full flex items-center justify-center cursor-pointer hover:h-[63px] duration-150 bg-softBlue ${newMessages ? "animate-bounce duration-1000":null}`}>
            <Phone className="w-5 h-5 text-white"/>
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-[0px_0px_20px_1px_rgba(126,154,234)] p-0 border-none">
            <div className="bg-softBlue rounded-t-md p-2 flex items-center justify-between">
                <DingloIOProfile isAgent={availableAgent}/>
                <DingloIOSettings/>
            </div>
            <div className="">
                <DingloIOMessages receivedMessages={receivedMessages}/>
            </div>
            <div className="px-2">
                <DingloIOSubmit setMessages={setReceivedMessages}/>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
