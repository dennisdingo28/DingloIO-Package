export interface dingloMessage {
    id: string
    isAgent: boolean;
    message: string;
    messagedAt: string;
    isNew: boolean
    agentName?: string;
    agentImage?: string;
    automated?: boolean;
}

export interface Question {
    id: string
    question: string;
    answer: string;
}