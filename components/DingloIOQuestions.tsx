"use client"

import { useQuery } from "@tanstack/react-query"
import { dingloIO } from "..";
import { Question } from "@/types";
import { DingloIOQuestion } from "./DingloIOQuestion";
import { MessageCircleQuestionIcon } from "lucide-react";

export const DingloIOQuestions = () =>{

    const {data: questions, isPending} = useQuery({
        queryKey:["questions"],
        queryFn: async()=>{
            const data = await dingloIO.getQuestions();
            
            return data.questions as Question[];
        } 
    });

    if(questions && questions.length>0)
        return (
            <div className="bg-lightBlue/20 p-2 rounded-md">
                <div className="flex items-center justify-center gap-1">
                    <p className="text-center font-medium text-sm text-softBlue">Ask a question</p>
                    <MessageCircleQuestionIcon className="w-3.6 h-3.6 text-softBlue"/>
                </div>
                {
                    isPending ? <p className="text-xs font-light text-softBlue">loading...</p>:(
                        <div className="space-y-1 mt-2">
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