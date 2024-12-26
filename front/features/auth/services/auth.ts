import { FetchApiService } from "@/services/api/FetchApiService";
import type { IURegister, IULogin } from "@/interfaces/IUauth";
import { endPoints } from "@/config/endPoints";

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
