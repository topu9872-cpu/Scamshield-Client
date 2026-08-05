import { Scan } from "@/types/scan";
import { getData, userPostData } from "./serverMutation";
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
