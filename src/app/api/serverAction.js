import { userPostData } from "./serverMutation"

export const WellComeUser=async(data)=>{
    return userPostData('/send-email', data)
}