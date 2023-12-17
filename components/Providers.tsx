"use client"
import { dingloIO } from "@/dinglo-io";
import { useEffect, useState } from "react";

export const Providers = ({children}:{children: React.ReactNode}) =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        dingloIO.initializeSocket();
        dingloIO.respond("hello client");
        setIsMounted(true);
    },[]);

    if(!isMounted)
        return null;

    return (
        <>
            {children}
        </>
    )
}