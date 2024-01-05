"use client"

import Image from "next/image"
import { dingloMessage } from "@/types"

interface DingloIOMessageProps{
    msg: dingloMessage;
}

export const DingloIOMessage = ({msg}: DingloIOMessageProps) =>{
    return (
        <div>
            <div className={`${!msg.isAgent && !msg.automated ? "bg-softBlue ml-auto":"shadow-[0px_0px_10px_1px_rgba(126,154,234)] mr-auto"} flex flex-col rounded-md p-1 max-w-fit`}>
                <div className={`flex gap-1 ${!msg.isAgent && !msg.automated ? "flex-row-reverse":null}`}>
                    {!msg.isAgent && !msg.automated ? null:(
                        <Image src={msg.agentImage!} width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-full mb-1" alt="agent-profile"/>
                    )}
                    <div className={`${!msg.isAgent && !msg.automated ? "text-white":"text-softBlue"} text-sm`}>
                        {msg.message}
                    </div>
                </div>
            </div>
            <div className={`${!msg.isAgent && !msg.automated ? "text-end":"text-start"} text-xs font-light text-black mt-1`}>{String(msg.messagedAt)}</div>
        </div>
    )
}