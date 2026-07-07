import { getData, userPostData } from "./serverMutation"

export const WellComeUser=async(data)=>{
    return userPostData('/send-email', data)
}
export const getUser=async(email)=>{
    return getData(`/user/${email}`)
}