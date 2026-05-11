import {StreamChat} from "stream-chat"
import { ENV } from "./env.js"
import {StreamClient} from "@stream-io/node-sdk"

const apiKey= ENV.STREAM_API_KEY
const apiSecret= ENV.STREAM_SECRET_KEY

if (!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY & STREAM_API_SECRET is missing")
}

console.log("STREAM API KEY USED:", apiKey);

export const chatClient=StreamChat.getInstance(apiKey,apiSecret) //this is for chat features
export const streamClient=new StreamClient(apiKey,apiSecret) //this is for video calls 

console.log("🔥 Stream client ready");

export const upsertStreamUser=async(userData) =>{
    try{
        console.log("🔥 Calling Stream with:", userData);
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted successfully",userData.id);
    }catch (error){
    console.error("❌ Stream Error (UPSERT):", error)
    throw error;
}
};


export const deleteStreamUser=async(userId) =>{
    try{
        await chatClient.deleteUser(userId)
        console.log("Stream user deleted successfully",userId);
    }catch (error){
    console.error("❌ Stream Error (DELETE):", error)
    throw error;
}
};
