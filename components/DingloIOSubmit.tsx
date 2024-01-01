"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DingloIOMessageValidator } from "@/validators";
import dingloIO from "@/dinglo-io";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { dingloMessage } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

interface DingloIOSubmit {
  messages: Array<dingloMessage> | undefined;
  syncedMessages: Array<dingloMessage>;
  setSyncedMessages: Dispatch<SetStateAction <Array<dingloMessage>>>;
}

export const DingloIOSubmit = ({
  messages,
  setSyncedMessages,
}: DingloIOSubmit) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DingloIOMessageValidator),
  });


  useEffect(()=>{
    if(messages)
      setSyncedMessages(messages);
  },[messages]);

  const { mutate: createMessage, isPending: isCreating } = useMutation({
    mutationFn: async (newMessage: Omit<dingloMessage, "isNew">) => {
      const data = await dingloIO.save(newMessage);

      return data;
    },
    onSuccess: (data, variables) => {
      if (!dingloIO || !dingloIO.socket) return;

      dingloIO.respond({
        id: variables.id,
        message: variables.message,
        isAgent: variables.isAgent,
        messagedAt: variables.messagedAt,
      });
    },
    onError: (err) => {
      if(messages)
      setSyncedMessages(messages);
    },
    onMutate: (variables) => {
      setSyncedMessages((prev) => [...prev, { ...variables, isNew: false }]);
    },
  });

  return (
    <div>
      <Separator
        className={`h-[1.5px] ${
          Object.keys(errors).length > 0 ? "bg-red-500" : "bg-softBlue"
        }`}
      />
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          
          createMessage({
            id: uuidv4(),
            isAgent: false,
            message: data.message,
            messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        })}
        className="pt-3 flex items-center justify-between pb-2"
      >
        <Input
          {...register("message")}
          onChange={(e) => {
            if (e.target.value && e.target.value !== "") {
              setTimeout(() => {
                if (!dingloIO.socket) return;

                dingloIO.socket.emit("typing", { isTyping: true });
              }, 500);
            } else {
              setTimeout(() => {
                if (!dingloIO.socket) return;

                dingloIO.socket.emit("typing", { isTyping: false });
              }, 500);
            }
          }}
          placeholder={
            errors.message?.message
              ? (errors.message.message as string)
              : "Enter your message..."
          }
          className="border-none"
        />
        <Button type="submit" variant={"outline"} className="group">
          <Send className="w-5 h-5 text-softBlue group-hover:text-white" />
        </Button>
      </form>
    </div>
  );
};
