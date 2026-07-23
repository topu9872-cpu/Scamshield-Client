import { getData, userPostData } from "./serverMutation";
import { Users } from "./Type";

export const WellComeUser = async (data:{data: Users}) => {
  return userPostData("/send-email", data);
};

export const getUser = async (email: string) => {
  return getData(`/user/${email}`);
};