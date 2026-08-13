import { Scan } from "@/types/scan";
import { getData, getDelete, userPostData } from "./serverMutation";
import { Users } from "@/types/Users";


export const WellComeUser = async (data: { data: Users }) => {
  return userPostData("/send-email", data);
};

export const getUser = async (email: string) => {
  return getData(`/user/${email}`);
};

export const scannerPost = async (data: Scan) => {
  return userPostData(`/scanner-data`, data);
};


export const getScanHistory=async(email)=>{
  return getData(`/scan-history/${email}`)
}
export const ScanHistoryDelete=async(id)=>{
  return getDelete(`/scan-history/${id}`)
}