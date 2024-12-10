import { FetchApiService } from "@/services/api/FetchApiService"
import type { IURegister, IULogin } from "@/services/interfaces/IUauth";
import { endPoints } from "@/services/utils/endPoints";
const api = new FetchApiService();

export const register = async (data: IURegister) => {
    const response = await api.post({
        url: endPoints.user.register,
        body: data, 
    });
    return response;
};

export const login = async (data: IULogin) => {
    const response = await api.post({
        url: endPoints.user.login,
        body: data, 
    });
    return response;
};