"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DingloIOMessageValidator } from "@/validators";
import dingloIO from "@/dinglo-io";
import { Separator } from "@radix-ui/react-separator";
import { dingloMessage } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const DingloIOSubmit = () => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string>("");
  const [invalidMessage, setInvalidMessage] = useState<boolean>(false);

  const { mutate: createMessage, isPending: isCreating } = useMutation({
    mutationFn: async (newMessage: Omit<dingloMessage, "isNew" | "id">) => {
      const data = await dingloIO.save(newMessage);

      return data;
    },
    onSuccess: (data, variables) => {
      if (!dingloIO || !dingloIO.socket) return;

      dingloIO.respond({
        message: variables.message,
        isAgent: variables.isAgent,
        messagedAt: variables.messagedAt,
      });
    },
    onMutate: (variables) => {
      queryClient.setQueryData(["getConversationMessages"], (old: dingloMessage[])=>[
        ...old,
        variables,
      ]);
    },
    onSettled:()=>{
      queryClient.invalidateQueries({queryKey:["getConversationMessages"]});
    }
  });

  useEffect(()=>{
    if(invalidMessage)
      setTimeout(()=>{
        setInvalidMessage(false);
    },1500);
  },[invalidMessage]);

  useEffect(()=>{
    if(message.trim()!=="" && invalidMessage) setInvalidMessage(false);

    setTimeout(()=>{
      dingloIO.socket?.emit("typing",{isTyping: message.trim()!=="" ? true:false});
    },500);
  }, [message]);


  return (
    <div>
      <Separator
        className={`h-[1.5px] ${
          invalidMessage? "bg-red-500" : "bg-softBlue"
        }`}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(message.trim()!=="")
            createMessage({
              isAgent: false,
              message: message,
              messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          else setInvalidMessage(true);

          setMessage("");
        }}
        className="pt-3 flex items-center justify-between pb-2"
      >
        <Input
          value={message}
          placeholder={
            "Enter your message..."
          }
          onChange={(e)=>{
            setMessage(e.target.value);
          }}
          className="border-none"
        />
        <Button type="submit" variant={"outline"} className="group">
          <Send className="w-5 h-5 text-softBlue group-hover:text-white" />
        </Button>
      </form>
    </div>
  );
};
