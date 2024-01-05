"use client"

import dingloIO from "@/dinglo-io";
import { Question, dingloMessage } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DingloIOQuestion = ({question}:{question: Question})=>{
    const queryClient = useQueryClient();

    const { mutate: createMessage, isPending: isCreating } = useMutation({
        mutationFn: async (newMessage: Omit<dingloMessage, "isNew" | "id">) => {
          const data = await dingloIO.save(newMessage);
          await dingloIO.save(
            {
              isAgent:false,
              message: question.answer,
              messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              automated: true,
            }
          )
          return data;
        },
        onMutate: (variables) => {
          queryClient.setQueryData(["getConversationMessages"], (old: dingloMessage[])=>[
            ...old,
            variables,
            {
              isAgent:true,
              message: question.answer,
              messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              automated:true,
              agentName:"Automat",
              agentImage:"https://res.cloudinary.com/dulb5sobi/image/upload/v1704311444/xjqlhfye2gn1f7urynwv.png",
            }
          ]);
          //default question
          dingloIO.respond({
            message: variables.message,
            isAgent: variables.isAgent,
            messagedAt: variables.messagedAt,
          });
          //default answer
          dingloIO.respond({
            message: question.answer,
            automated:true,
            isAgent:false,
            messagedAt: variables.messagedAt,
          });
        },
        onSettled:()=>{
          queryClient.invalidateQueries({queryKey:["getConversationMessages"]});
          dingloIO.socket?.emit("invalidate-query");
        }
      });
    return (
        <p onClick={()=>createMessage({isAgent:false, message: question.question, messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})} className="text-xs cursor-pointer hover:text-softBlue">{question.question}</p>
    )
}