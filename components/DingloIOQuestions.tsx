"use client"

import { useQuery } from "@tanstack/react-query"
import { dingloIO } from "..";
import { Question } from "@/types";
import { DingloIOQuestion } from "./DingloIOQuestion";

export const DingloIOQuestions = () =>{

    const {data: questions, isPending} = useQuery({
        queryKey:["questions"],
        queryFn: async()=>{
            const data = await dingloIO.getQuestions();
            
            return data.questions as Question[];
        } 
    });

    if(questions)
        return (
            <div className="bg-lightBlue/20 p-2 rounded-md">
                <p className="text-center font-medium text-sm text-softBlue">Ask a question</p>
                {
                    isPending ? <p>loading...</p>:(
                        <div className="space-y-1">
                        {questions?.map(q=>(
                            <DingloIOQuestion key={q.id} question={q}/>
                        ))}
                        </div>
                    )
                }
            </div>
        )
    return null;
}