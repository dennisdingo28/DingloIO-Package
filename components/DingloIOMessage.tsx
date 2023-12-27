"use client"

import Image from "next/image"
import { dingloMessage } from "@/types"

export const DingloIOMessage: React.FC<dingloMessage> = ({message, isAgent, messagedAt}) =>{
    return (
        <div>
            <div className={`${!isAgent ? "bg-softBlue ml-auto":"shadow-[0px_0px_10px_1px_rgba(126,154,234)] mr-auto"} flex flex-col rounded-md p-1 max-w-fit`}>
                <div className={`flex gap-1 ${!isAgent ? "flex-row-reverse":null}`}>
                    {!isAgent ? null:(
                        <Image src={"/profile.jpg"} width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-full mb-1" alt="agent-profile"/>
                    )}
                    <div className={`${!isAgent ? "text-white":"text-softBlue"} text-sm`}>
                        {message}
                    </div>
                </div>
            </div>
            <div className={`${!isAgent ? "text-end":"text-start"} text-xs font-light text-black mt-1`}>{String(messagedAt)}</div>
        </div>
    )
}