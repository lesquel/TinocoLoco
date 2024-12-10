import { FetchApiService } from "@/services/api/FetchApiService"
import type { IURegister, IULogin } from "@/services/interfaces/IUauth";

const api = new FetchApiService();

export const register = async (data: IURegister) => {
    const response = await api.post({
        url: 'user/',
        body: data, 
    });
    return response;
};

export const login = async (data: IULogin) : Promise<> => {
    const response = await api.post({
        url: 'user/login/',
        body: data, 
    });
    return response;
};