import { Socket, io } from "socket.io-client";
import { nanoid } from "nanoid";
import { dingloMessage } from "./types";
import axios from "axios";

class DingloIO {
    socket: Socket | undefined;
    
    private storagePrefix = "DingloIO-";
    private apiKey = "";
    private chatId = this.getFromLocalStorage(this.storagePrefix+"user");

    initializeSocket(apiKey: string){
        if(!this.socket){
            if(!this.getFromLocalStorage(this.storagePrefix+"user"))
                this.uniqueUser();

            this.apiKey = apiKey;
            this.socket = io("http://localhost:3001",{query:{apiKey, connectionId: this.getFromLocalStorage(this.storagePrefix+"user")}});
            this.chatId=this.getFromLocalStorage(this.storagePrefix+"user");
        }
    }
    on(event: string, cb:(param: any)=>void){
        this.socket?.on(event,cb);
    }
    off(event: string){
        this.socket?.off(event);
    }
    respond(msg: dingloMessage){
        const messagedAt = new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        this.socket?.emit("message",{message:msg, isAgent: false, messagedAt:messagedAt});
    }
    async save(newMessage: dingloMessage){
        const res = await axios.post(`http://localhost:3000/api/client/${this.chatId}`,{...newMessage, api_key: this.apiKey});
    
        return res.data;
    }
    disconnectSocket(){
        this.socket?.disconnect();
    }

    private getFromLocalStorage(key: string, parse?: boolean){
        const item = localStorage.getItem(key);
        if(!item) return null;

        if(parse){
            return JSON.parse(item);
        }
        return localStorage.getItem(key);
    }
  
    private uniqueUser(){
        localStorage.setItem("DingloIO-user",nanoid());
    }
}

const dingloIO = new DingloIO();
dingloIO.initializeSocket("dinglo-6c97614356ef429ba24cf9f344858239");
export default dingloIO;