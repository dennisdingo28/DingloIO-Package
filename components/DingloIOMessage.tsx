"use client"



export const DingloIOMessage = ({message}: {message: string}) =>{
    return (
        <div className="bg-softBlue text-white py-2 px-1 rounded-md text-sm">{message}</div>
    )
}