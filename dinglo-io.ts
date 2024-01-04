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
            this.chatId = this.getFromLocalStorage(this.storagePrefix+"user");
        }
    }
    on(event: string, cb:(param: any)=>void){
        this.socket?.on(event,cb);
    }
    off(event: string){
        this.socket?.off(event);
    }
    respond(msg: Omit<dingloMessage, "isNew" | "id">){
        const messagedAt = new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        this.socket?.emit("message",{...msg});
    }
    async save(newMessage: Omit<dingloMessage, "isNew" | "id">){
        const res = await fetch(`http://localhost:3000/api/client/${this.chatId}`,{method:"POST", body:JSON.stringify({...newMessage, apiKey: this.apiKey})});
        const data = await res.json();
        return data;
    }
    async getConversation(){
        const res = await axios.get(`http://localhost:3000/api/client/${this.chatId}?apiKey=${this.apiKey}`);
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
dingloIO.initializeSocket("dinglo-ca36c6449973455fb1e89af563d8972b");
export default dingloIO;