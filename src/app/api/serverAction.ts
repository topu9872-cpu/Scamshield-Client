import { Scan } from "@/DashboardComponents/user/ScamScanner";
import { getData, userPostData } from "./serverMutation";
import { Users } from "./Type";

export const WellComeUser = async (data: { data: Users }) => {
  return userPostData("/send-email", data);
};

export const getUser = async (email: string) => {
  return getData(`/user/${email}`);
};

export const scannerPost = async (data: Scan) => {
  return userPostData(`/scanner-data`, data);
};
