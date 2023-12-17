"use client";

import { Phone, Send } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DingloIOProfile } from "./DingloIOProfile";
import { DingloIOSettings } from "./DingloIOSettings";
import { DingloIOMessages } from "./DingloIOMessages";

export const DingloIOWidget = () => {
  return (
    <div className="fixed bottom-2 right-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-[60px] h-[60px] hover:w-[63px] rounded-full flex items-center justify-center cursor-pointer hover:h-[63px] duration-150 bg-softBlue">
            <Phone className="w-5 h-5 text-white"/>
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-[0px_0px_20px_1px_rgba(126,154,234)] p-0 border-none">
            <div className="bg-softBlue rounded-t-md p-2 flex items-center justify-between">
                <DingloIOProfile/>
                <DingloIOSettings/>
            </div>
            <div className="px-2">
                <DingloIOMessages/>
            </div>
            <div className="px-2">
                <Separator className="h-[1.5px] bg-softBlue"/>
                <div className="pt-3">
                    <form className="flex items-center justify-between pb-2">
                        <Input placeholder="Enter your message..." className="border-none"/>
                        <Button variant={"outline"} className="group">
                            <Send className="w-5 h-5 text-softBlue group-hover:text-white"/>
                        </Button>
                    </form>
                </div>
            </div>

        </PopoverContent>
      </Popover>
    </div>
  );
};
