import { Socket, io } from "socket.io-client";
import { nanoid } from "nanoid";

export class DingloIO {
    socket :Socket | undefined;
    initializeSocket(){
        if(!this.socket){
            this.socket = io("http://localhost:3001")
        }

        if(!this.getFromLocalStorage("DingloIO-user"))
            this.uniqueUser();

    }
    on(event: string, cb:(param: any)=>void){
        this.socket?.on(event,cb);
    }
    off(event: string){
        this.socket?.off(event);
    }
    respond(msg: string){
        this.socket?.emit("message",{message:msg, isAgent: false, messagedAt: new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })});
    }
    disconnectSocket(){
        this.socket?.disconnect();
    }

    private getFromLocalStorage(key: string){
        return localStorage.getItem(key);
    }
    private uniqueUser(){
        localStorage.setItem("DingloIO-user",nanoid());
    }
}

export const dingloIO = new DingloIO();
dingloIO.initializeSocket();