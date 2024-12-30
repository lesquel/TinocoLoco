import type { IURegister, IULogin, IUGetUsers, IUSendPasswordResetCode } from "@/interfaces/IUauth";

import { getTokenFromCookie } from "../utils/getUserInfo";

import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUcodeEmail, IUGetUser, IUUser, IUUserMostRentals } from "@/interfaces/IUser";
import { construcUrl } from "@/services/utils/construcUrl";

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
  const response = await api.get<IUGetUser>({
    url: endPoints.user.get + id + "/",
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return response;
};

export const sendVerificationEmail = async () => {
  console.log(getTokenFromCookie(), "getTokenFromCookie()");
  const response = await api.post({
    url: endPoints.user.sendVerificationEmail,
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return response;
};

export const verificationCodeEmail = async (data: IUcodeEmail) => {
  const response = await api.post({
    url: endPoints.user.verificationEmail,
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



export const getUsers = async (options?: any) => {
  const response = await api.get<IUGetUsers>({
    url: endPoints.user.get + (options ? construcUrl({ options }) : ""),
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });
  return response;
};



export const sendPasswordResetCode = async (
  data: {
    email: string
  }
) => {
  const response = await api.post({
    url: endPoints.user.usersSendPasswordresetCode,
    body: JSON.stringify(data),
  });
  return response;
};

export const resetPassword = async ({data}: {data: IUSendPasswordResetCode}) => {
  const response = await api.post<IUSendPasswordResetCode>({
    url: endPoints.user.resetPassword,
    body: JSON.stringify(data),
  });
  return response;
};


export const getUsersMostRentals = async (options?: any) => {
  const response = await api.get<IUUserMostRentals>({
    url: endPoints.user.topUsers + (options ? construcUrl({ options }) : ""),
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });
  return response;
};
  