"use client";

import Image from "next/image";

export const DingloIOProfile = ({agent}:{agent: any}) => {


  return (
    <div>
      {agent.available ? (
        <div className="flex items-center gap-2">
        <div>
          <Image
            width={55}
            height={55}
            className="rounded-full w-[55px] h-[55px] object-cover"
            quality={100}
            priority
            src={agent.agentImage}
            alt="agent-profile"
          />
        </div>
        <div className="text-white">
          <p className="text-sm font-medium">{agent.agentName}</p>
          <div className="flex items-center gap-1">
            <span className="w-[10px] h-[10px] bg-green-500 rounded-full"/>
            <span className="text-xs text-green-500">Online</span>
          </div>
        </div>
      </div>
      ):(
        <div className="text-white font-medium">Write us and we will handle the rest</div>
      )}
      
    </div>
  );
};
