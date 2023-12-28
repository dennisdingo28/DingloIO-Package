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
  const [receivedMessages, setReceivedMessages] = useState<
    Array<dingloMessage>
  >([]);
  const [newMessages, setNewMessages] = useState<boolean>(false);
  const [agent, setAgent] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dingloIO.off("message_client");
    dingloIO.off("available_agent");

    dingloIO.on("message_client", (message: dingloMessage) => {
      setReceivedMessages((prev) => [...prev, message]);
      console.log(message, isOpen);

      if (message.isNew && !isOpen) setNewMessages(true);
    });
    dingloIO.on("available_agent", (availableAgent) => {
      setAgent(availableAgent);
    });

    return () => {
      dingloIO.off("message_client");
      dingloIO.off("available_agent");
    };
  }, [isOpen]);

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  return (
    <div className="fixed bottom-2 right-2">
      <Popover
        onOpenChange={(open) => {
          console.log("popover", open);
          setIsOpen(open);
          setNewMessages(false);
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={`w-[60px] h-[60px] ${
              !newMessages ? "hover:h-[63px] hover:w-[63px]" : null
            } rounded-full flex items-center bg-softBlue justify-center cursor-pointer  ${
              newMessages
                ? "duration-1000 hover:h-[60px] hover:w-[60px] animate-bounce"
                : "duration-150"
            }`}
          >
            <Phone className="w-5 h-5 text-white" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-[0px_0px_20px_1px_rgba(126,154,234)] p-0 border-none">
          <div className="bg-softBlue rounded-t-md p-2 flex items-center justify-between">
            <DingloIOProfile agent={agent} />
            <DingloIOSettings />
          </div>
          <div className="">
            <DingloIOMessages receivedMessages={receivedMessages} />
          </div>
          <div className="px-2">
            <DingloIOSubmit setMessages={setReceivedMessages} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
