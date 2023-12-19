"use client"

import Image from "next/image"
import { dingloMessage } from "@/types"

export const DingloIOMessage: React.FC<dingloMessage> = ({message, isAgent, messagedAt}) =>{
    return (
        <div>
            <div className={`${!isAgent ? "bg-softBlue":"shadow-[0px_0px_10px_1px_rgba(126,154,234)]"} flex flex-col rounded-md p-1 max-w-[336px] mx-auto`}>
                <div className={`flex gap-1 ${!isAgent ? "flex-row-reverse":null}`}>
                    {!isAgent ? null:(
                        <Image src={"/profile.jpg"} width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-full mb-1" alt="agent-profile"/>
                    )}
                    <div className={`${!isAgent ? "text-white":"text-softBlue"} text-sm`}>
                        {message}
                    </div>
                </div>
                <div className={`${!isAgent ? "self-start":"self-end"} text-xs font-light ${!isAgent ? "text-gray-200":"text-black"}`}>{String(messagedAt)}</div>
            </div>
        </div>
    )
}