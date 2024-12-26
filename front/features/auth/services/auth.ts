import { FetchApiService } from "@/services/api/FetchApiService";
import type { IURegister, IULogin } from "@/interfaces/IUauth";
import { endPoints } from "@/config/endPoints";
import { IUUser } from "@/interfaces/IUser";
import { getTokenFromCookie } from "../utils/getUserInfo";

const api = new FetchApiService();

export const register = async (data: IURegister) => {
  const response = await api.post({
    url: endPoints.user.register,
    body: JSON.stringify(data),
  });
  console.log("response:bwfevgbkweofwegg", response);
  return response;
};

export const login = async (data: IULogin) => {
  const response = await api.post({
    url: endPoints.user.login,
    body: JSON.stringify(data),
  });
  return response;
};


export const editUser = async (data: IUUser, id: number) => {
  const response = await api.put({
    url: endPoints.user.edit + getTokenFromCookie()?.user?.id + "/",
    body: JSON.stringify(data),
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });
  return response;
};
export const getUser = async (id: number) => {
  const response = await api.get({
    url: endPoints.user.get + id + "/",
    options : {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });
  return response;
};



const sendVerificationEmail = async (data: IUUser) => {
  const response = await api.post({
    url: endPoints.user.sendVerificationEmail,
    body: JSON.stringify(data),
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });
  return response;
};