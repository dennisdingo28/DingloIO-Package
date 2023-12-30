import { Socket, io } from "socket.io-client";
import { nanoid } from "nanoid";

class DingloIO {
    socket: Socket | undefined;
    
    private storagePrefix = "DingloIO-";
    initializeSocket(apiKey: string){
        if(!this.socket){
            if(!this.getFromLocalStorage(this.storagePrefix+"user"))
                this.uniqueUser();
            
            this.socket = io("http://localhost:3001",{query:{apiKey, connectionId: this.getFromLocalStorage(this.storagePrefix+"user")}});
        }
    }
    on(event: string, cb:(param: any)=>void){
        this.socket?.on(event,cb);
    }
    off(event: string){
        this.socket?.off(event);
    }
    respond(msg: string){
        const messagedAt = new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        this.socket?.emit("message",{message:msg, isAgent: false, messagedAt:messagedAt});
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
dingloIO.initializeSocket("dinglo-4fa112bc86714d66bb8454c607bc2818");
export default dingloIO;