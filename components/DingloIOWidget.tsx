"use client";

import { Loader2, Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DingloIOProfile } from "./DingloIOProfile";
import { DingloIOSettings } from "./DingloIOSettings";
import { DingloIOMessages } from "./DingloIOMessages";
import { DingloIOSubmit } from "./DingloIOSubmit";
import { useEffect, useState } from "react";
import dingloIO from "@/dinglo-io";
import { dingloMessage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const DingloIOWidget = () => {

  const [syncedMessages, setSyncedMessages] = useState<Array<dingloMessage>>([]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<boolean>(false);
  const [agent, setAgent] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  const {data: messages ,isPending} = useQuery({
    queryKey:["getConversationMessages"],
   
    queryFn:async()=>{
      const data = await dingloIO.getConversation();
      console.log("syncing", data);
      
      setSyncedMessages(data.messages);
      return data.messages as dingloMessage[];
    },
  });

  useEffect(() => {


    dingloIO.on("disable_project",(status)=>{
        setIsActive(status.isActive);
    });

    if(isActive){

      dingloIO.on("message_client",(msg)=>{
        setSyncedMessages(prev=>[...prev, msg]);
      });
  
      dingloIO.on("available_agent", (availableAgent) => {
        setAgent(availableAgent);
      });
  
      dingloIO.on("typing", (typing) => {
        setIsTyping(typing.isTyping);
      });
  
      dingloIO.on("delete_message",(msgId)=>{
        
        setSyncedMessages(prev=>{
          return prev.filter(msg=>msg.id!==msgId);
        })
      });
    }
   
    
    return () => {
      dingloIO.off("message_client");
      dingloIO.off("available_agent");
      dingloIO.off("message_client");
      dingloIO.off("available_agent");
      dingloIO.off("typing");
      dingloIO.off("disable_project");
      dingloIO.off("delete_message");
    };
  }, [dingloIO.socket,isOpen, isActive]);
  


  if(isActive===false) return null;

  return (
    <div className="fixed bottom-2 right-2">
      <Popover
        onOpenChange={(open) => {
          console.log("popover", open);
          setIsOpen(open);
          setNewMessages(false);
        }}
      >
        
        <PopoverTrigger disabled={!isActive} asChild>
          <div
            className={`w-[60px] h-[60px] ${
              !newMessages ? "hover:h-[63px] hover:w-[63px]" : null
            } rounded-full flex items-center bg-softBlue justify-center cursor-pointer  ${
              newMessages
                ? "duration-1000 hover:h-[60px] hover:w-[60px] animate-bounce"
                : "duration-150"
            }`}
          >
            {isActive===undefined ? <Loader2 className="w-5 h-5 text-white animate-spin"/>: null}
            {isActive ? <Phone className="w-5 h-5 text-white" />: null}

          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-[0px_0px_20px_1px_rgba(126,154,234)] p-0 border-none">
          <div className="bg-softBlue rounded-t-md p-2 flex items-center justify-between">
            <DingloIOProfile agent={agent} typing={isTyping}/>
            <DingloIOSettings />
          </div>
          <div className="">
            <DingloIOMessages receivedMessages={syncedMessages} />
          </div>
          <div className="px-2">
            <DingloIOSubmit messages={messages} syncedMessages={syncedMessages} setSyncedMessages={setSyncedMessages} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
