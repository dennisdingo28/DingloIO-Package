"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DingloIOMessageValidator } from "@/validators";
import dingloIO from "@/dinglo-io";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { dingloMessage } from "@/types";

interface DingloIOSubmit {
    setMessages: Dispatch<SetStateAction<Array<dingloMessage>>>;
}

export const DingloIOSubmit = ({setMessages}: DingloIOSubmit) => {

    const {handleSubmit, register, formState:{errors}} = useForm({
        resolver: zodResolver(DingloIOMessageValidator),
    });

    useEffect(()=>{
        console.log(errors);
        
    },[errors]);

  return (
    <div>
        <Separator className={`h-[1.5px] ${Object.keys(errors).length>0 ? "bg-red-500":"bg-softBlue"}`}/>
        <form onSubmit={handleSubmit((data)=>{
            setMessages(prev=>[...prev, {isAgent: false, message:data.message, messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), isNew:false}])
            dingloIO.respond(data.message)
            })} className="pt-3 flex items-center justify-between pb-2">
            <Input {...register("message")} placeholder={errors.message?.message ? errors.message.message as string:"Enter your message..."} className="border-none" />
            <Button variant={"outline"} className="group">
            <Send className="w-5 h-5 text-softBlue group-hover:text-white" />
            </Button>
        </form>
    </div>
  );
};
